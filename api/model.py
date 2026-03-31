# api/model.py
# ============================================================
# LightGBM Model for Rossmann Sales Forecasting
# Features: store attributes + temporal + promo + holiday
# ============================================================

import os
import pickle
import warnings
warnings.filterwarnings("ignore")

import numpy as np
import pandas as pd

try:
    import lightgbm as lgb
    LGB_AVAILABLE = True
except ImportError:
    LGB_AVAILABLE = False
    print("⚠️  LightGBM not installed. Run: pip install lightgbm")

# Paths
DATA_DIR  = os.getenv("DATA_DIR", "./data")
MODEL_PATH = os.path.join(DATA_DIR, "rossmann_lgb_model.pkl")
TRAIN_CSV  = os.path.join(DATA_DIR, "train.csv")
STORE_CSV  = os.path.join(DATA_DIR, "store.csv")
TEST_CSV   = os.path.join(DATA_DIR, "test.csv")


class RossmannModel:
    """
    LightGBM model for Rossmann store sales prediction.

    Usage:
        model = RossmannModel()
        model.load_or_train()           # train if no saved model
        pred = model.predict_one(...)   # single prediction
        data = model.get_timeline_forecast()
    """

    def __init__(self):
        self.model     = None
        self.store_df  = None
        self.is_trained = False
        self.version   = "lgb-v1.0"
        self.feature_cols: list = []

    # ── Public ───────────────────────────────────────────────

    def load_or_train(self):
        """Load from disk if available, otherwise train from scratch."""
        if os.path.exists(MODEL_PATH):
            print(f"📦 Loading saved model from {MODEL_PATH}")
            self._load()
        else:
            print("🏋️  No saved model found. Training from scratch...")
            self._train()

    def predict_one(self, store: int, day_of_week: int, date: str,
                    open_: int, promo: int, state_holiday: str,
                    school_holiday: int) -> float:
        """Predict sales for a single store-day."""
        if not self.is_trained:
            raise RuntimeError("Model not trained yet")

        row = self._build_row(
            store=store, day_of_week=day_of_week, date=date,
            open_=open_, promo=promo, state_holiday=state_holiday,
            school_holiday=school_holiday,
        )
        X = pd.DataFrame([row])[self.feature_cols]
        pred = float(self.model.predict(X)[0])
        return max(pred, 0.0)

    def get_timeline_forecast(self) -> list:
        """Daily network-wide actual vs predicted (test period)."""
        test  = pd.read_csv(TEST_CSV)
        store = self._get_store()
        df = test.merge(store, on="Store", how="left")
        df["Date"] = pd.to_datetime(df["Date"])
        df = self._add_features(df)
        df = df[df["Open"] == 1].copy()

        X = df[self.feature_cols]
        df["predicted"] = np.maximum(self.model.predict(X), 0)

        # Group by date
        grp = df.groupby("Date")["predicted"].sum().reset_index()
        grp["date"] = grp["Date"].dt.strftime("%m/%d")
        return grp[["date", "predicted"]].rename(
            columns={"predicted": "predicted"}
        ).to_dict("records")

    def get_type_forecast(self) -> list:
        """Avg predicted sales per store type with/without promo."""
        store = self._get_store()
        results = []
        for st in ["a", "b", "c", "d"]:
            s = store[store["StoreType"] == st]
            if s.empty:
                continue
            avg_comp = s["CompetitionDistance"].median()
            base_row = {
                "DayOfWeek": 3, "date_parsed": pd.Timestamp("2015-08-19"),
                "Open": 1, "StateHoliday": "0", "SchoolHoliday": 0,
                "StoreType": st, "Assortment": s["Assortment"].mode()[0],
                "CompetitionDistance": avg_comp,
                "Promo2": s["Promo2"].mode()[0],
            }
            for promo in [0, 1]:
                row = {**base_row, "Promo": promo}
                X = pd.DataFrame([self._extract_features(row)])[self.feature_cols]
                pred = max(float(self.model.predict(X)[0]), 0)
                results.append({"storeType": f"Type {st.upper()}", "promo": promo, "avgSales": round(pred)})

        out = []
        for st in ["Type A", "Type B", "Type C", "Type D"]:
            no_p = next((r["avgSales"] for r in results if r["storeType"] == st and r["promo"] == 0), 0)
            wi_p = next((r["avgSales"] for r in results if r["storeType"] == st and r["promo"] == 1), 0)
            out.append({
                "storeType": st,
                "promoOff":  no_p,
                "promoOn":   wi_p,
                "predicted": round((no_p + wi_p) / 2),
            })
        return out

    def get_promo_impact(self) -> list:
        rows = self.get_type_forecast()
        result = []
        for r in rows:
            lift = round((r["promoOn"] - r["promoOff"]) / r["promoOff"] * 100, 1) if r["promoOff"] else 0
            result.append({**r, "liftPct": lift})
        return result

    def get_store_ranking(self, top_n: int = 20) -> list:
        """Top N stores by predicted avg daily sales."""
        test  = pd.read_csv(TEST_CSV)
        store = self._get_store()
        df = test.merge(store, on="Store", how="left")
        df["Date"] = pd.to_datetime(df["Date"])
        df = self._add_features(df)
        df = df[df["Open"] == 1].copy()
        X = df[self.feature_cols]
        df["predicted"] = np.maximum(self.model.predict(X), 0)
        grp = df.groupby(["Store"])["predicted"].mean().reset_index()
        grp.columns = ["store", "predictedSales"]
        grp["predictedSales"] = grp["predictedSales"].round().astype(int)
        top = grp.sort_values("predictedSales", ascending=False).head(top_n)
        top["store"] = top["store"].apply(lambda x: f"Store {x:04d}")
        # Add store type
        top = top.merge(
            store[["Store", "StoreType"]].rename(columns={"Store": "store_id", "StoreType": "storeType"}),
            left_on="store", right_on=top["store"].str.extract(r"(\d+)")[0].astype(int).rename("store_id"),
            how="left",
        )
        top["storeType"] = top["storeType"].str.upper().apply(lambda x: f"Type {x}" if pd.notna(x) else "Type A")
        return top[["store", "storeType", "predictedSales"]].to_dict("records")

    def get_heatmap(self) -> list:
        """Weekly × day-of-week avg predicted sales."""
        test  = pd.read_csv(TEST_CSV)
        store = self._get_store()
        df = test.merge(store, on="Store", how="left")
        df["Date"] = pd.to_datetime(df["Date"])
        df = self._add_features(df)
        df = df[df["Open"] == 1].copy()
        X = df[self.feature_cols]
        df["predicted"] = np.maximum(self.model.predict(X), 0)
        df["week_num"] = df["Date"].dt.isocalendar().week
        # Map to W1-W7
        weeks = sorted(df["week_num"].unique())
        week_map = {w: f"W{i+1}" for i, w in enumerate(weeks[:7])}
        df["week_label"] = df["week_num"].map(week_map)
        day_map = {1:"Mon", 2:"Tue", 3:"Wed", 4:"Thu", 5:"Fri", 6:"Sat", 7:"Sun"}
        df["day"] = df["DayOfWeek"].map(day_map)
        grp = df.groupby(["week_label", "day"])["predicted"].mean().reset_index()
        grp.columns = ["week", "day", "sales"]
        grp["sales"] = grp["sales"].round().astype(int)
        return grp.to_dict("records")

    # ── Private ──────────────────────────────────────────────

    def _get_store(self) -> pd.DataFrame:
        if self.store_df is None:
            self.store_df = pd.read_csv(STORE_CSV)
        return self.store_df

    def _train(self):
        if not LGB_AVAILABLE:
            raise RuntimeError("LightGBM is not installed")

        print("📂 Loading training data...")
        train = pd.read_csv(TRAIN_CSV, low_memory=False)
        store = self._get_store()

        print("🔧 Preprocessing...")
        train = train[train["Open"] == 1].copy()
        train = train[train["Sales"] > 0].copy()
        df = train.merge(store, on="Store", how="left")
        df["Date"] = pd.to_datetime(df["Date"])
        df = self._add_features(df)

        self.feature_cols = [
            "Store", "DayOfWeek", "Promo", "SchoolHoliday",
            "StoreType_enc", "Assortment_enc", "StateHoliday_enc",
            "CompetitionDistance",
            "CompetitionOpenSinceMonth", "CompetitionOpenSinceYear",
            "Promo2", "Promo2SinceWeek", "Promo2SinceYear",
            "year", "month", "day", "week_of_year",
            "competition_open_months",
        ]
        # Keep only cols that exist
        self.feature_cols = [c for c in self.feature_cols if c in df.columns]

        X = df[self.feature_cols]
        y = df["Sales"]

        # Train/val split (last 6 weeks as validation)
        cutoff = pd.Timestamp("2015-06-19")
        X_train, y_train = X[df["Date"] < cutoff],  y[df["Date"] < cutoff]
        X_val,   y_val   = X[df["Date"] >= cutoff], y[df["Date"] >= cutoff]

        print(f"🏋️  Training on {len(X_train):,} rows, validating on {len(X_val):,} rows...")

        lgb_train = lgb.Dataset(X_train, y_train)
        lgb_val   = lgb.Dataset(X_val,   y_val, reference=lgb_train)

        params = {
            "objective":        "regression",
            "metric":           "rmse",
            "num_leaves":       127,
            "learning_rate":    0.05,
            "feature_fraction": 0.8,
            "bagging_fraction": 0.8,
            "bagging_freq":     5,
            "min_child_samples": 20,
            "verbose":          -1,
        }

        callbacks = [lgb.early_stopping(50, verbose=True), lgb.log_evaluation(100)]

        self.model = lgb.train(
            params,
            lgb_train,
            num_boost_round=2000,
            valid_sets=[lgb_val],
            callbacks=callbacks,
        )

        self.is_trained = True
        self._save()
        print(f"✅ Training complete. Best iteration: {self.model.best_iteration}")

    def _save(self):
        os.makedirs(DATA_DIR, exist_ok=True)
        with open(MODEL_PATH, "wb") as f:
            pickle.dump({"model": self.model, "feature_cols": self.feature_cols}, f)
        print(f"💾 Model saved to {MODEL_PATH}")

    def _load(self):
        with open(MODEL_PATH, "rb") as f:
            data = pickle.load(f)
        self.model        = data["model"]
        self.feature_cols = data["feature_cols"]
        self.is_trained   = True

    def _add_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Feature engineering applied to any dataset."""
        # Encode categoricals
        df["StoreType_enc"]   = df["StoreType"].map({"a":0,"b":1,"c":2,"d":3}).fillna(0).astype(int)
        df["Assortment_enc"]  = df["Assortment"].map({"a":0,"b":1,"c":2}).fillna(0).astype(int)
        df["StateHoliday_enc"]= df["StateHoliday"].map({"0":0,"a":1,"b":2,"c":3}).fillna(0).astype(int)

        # Date features
        df["year"]         = df["Date"].dt.year
        df["month"]        = df["Date"].dt.month
        df["day"]          = df["Date"].dt.day
        df["week_of_year"] = df["Date"].dt.isocalendar().week.astype(int)

        # Competition open duration in months
        df["CompetitionDistance"] = df["CompetitionDistance"].fillna(df["CompetitionDistance"].median())
        df["CompetitionOpenSinceMonth"] = df["CompetitionOpenSinceMonth"].fillna(0)
        df["CompetitionOpenSinceYear"]  = df["CompetitionOpenSinceYear"].fillna(0)
        df["Promo2SinceWeek"]  = df["Promo2SinceWeek"].fillna(0)
        df["Promo2SinceYear"]  = df["Promo2SinceYear"].fillna(0)

        df["competition_open_months"] = (
            (df["year"] - df["CompetitionOpenSinceYear"]) * 12
            + (df["month"] - df["CompetitionOpenSinceMonth"])
        ).clip(lower=0)

        return df

    def _build_row(self, store, day_of_week, date, open_, promo,
                   state_holiday, school_holiday) -> dict:
        """Build a feature dict for a single row."""
        store_df = self._get_store()
        s = store_df[store_df["Store"] == store]
        if s.empty:
            s = store_df.iloc[[0]]

        ts = pd.Timestamp(date)
        row = {
            "Store":                      store,
            "DayOfWeek":                  day_of_week,
            "Promo":                      promo,
            "SchoolHoliday":              school_holiday,
            "StateHoliday":               state_holiday,
            "Open":                       open_,
            "StoreType":                  s["StoreType"].values[0],
            "Assortment":                 s["Assortment"].values[0],
            "CompetitionDistance":        s["CompetitionDistance"].values[0],
            "CompetitionOpenSinceMonth":  s["CompetitionOpenSinceMonth"].values[0],
            "CompetitionOpenSinceYear":   s["CompetitionOpenSinceYear"].values[0],
            "Promo2":                     s["Promo2"].values[0],
            "Promo2SinceWeek":            s.get("Promo2SinceWeek", pd.Series([0])).values[0],
            "Promo2SinceYear":            s.get("Promo2SinceYear", pd.Series([0])).values[0],
            "Date":                       ts,
        }
        # Add date + categorical features inline
        row["StoreType_enc"]    = {"a":0,"b":1,"c":2,"d":3}.get(row["StoreType"], 0)
        row["Assortment_enc"]   = {"a":0,"b":1,"c":2}.get(row["Assortment"], 0)
        row["StateHoliday_enc"] = {"0":0,"a":1,"b":2,"c":3}.get(state_holiday, 0)
        row["year"]  = ts.year
        row["month"] = ts.month
        row["day"]   = ts.day
        row["week_of_year"] = ts.isocalendar()[1]
        row["CompetitionDistance"] = float(row["CompetitionDistance"] or 5000)
        row["CompetitionOpenSinceMonth"] = float(row["CompetitionOpenSinceMonth"] or 0)
        row["CompetitionOpenSinceYear"]  = float(row["CompetitionOpenSinceYear"]  or 0)
        row["Promo2SinceWeek"] = float(row["Promo2SinceWeek"] or 0)
        row["Promo2SinceYear"] = float(row["Promo2SinceYear"] or 0)
        row["competition_open_months"] = max(
            (ts.year - row["CompetitionOpenSinceYear"]) * 12
            + (ts.month - row["CompetitionOpenSinceMonth"]), 0
        )
        return row

    def _extract_features(self, row: dict) -> dict:
        """Convert a pre-built row dict into model feature dict."""
        ts = row.get("date_parsed", pd.Timestamp("2015-08-19"))
        return {
            "Store":                      0,
            "DayOfWeek":                  row.get("DayOfWeek", 3),
            "Promo":                      row.get("Promo", 0),
            "SchoolHoliday":              row.get("SchoolHoliday", 0),
            "StoreType_enc":              {"a":0,"b":1,"c":2,"d":3}.get(row.get("StoreType","a"),0),
            "Assortment_enc":             {"a":0,"b":1,"c":2}.get(row.get("Assortment","a"),0),
            "StateHoliday_enc":           {"0":0,"a":1,"b":2,"c":3}.get(row.get("StateHoliday","0"),0),
            "CompetitionDistance":        float(row.get("CompetitionDistance", 5000) or 5000),
            "CompetitionOpenSinceMonth":  float(row.get("CompetitionOpenSinceMonth", 6) or 6),
            "CompetitionOpenSinceYear":   float(row.get("CompetitionOpenSinceYear", 2010) or 2010),
            "Promo2":                     int(row.get("Promo2", 0)),
            "Promo2SinceWeek":            float(row.get("Promo2SinceWeek", 0) or 0),
            "Promo2SinceYear":            float(row.get("Promo2SinceYear", 0) or 0),
            "year":                       ts.year,
            "month":                      ts.month,
            "day":                        ts.day,
            "week_of_year":               ts.isocalendar()[1],
            "competition_open_months":    max((ts.year - 2010) * 12 + (ts.month - 6), 0),
        }
