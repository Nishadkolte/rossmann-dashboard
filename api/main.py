# api/main.py
# ============================================================
# Rossmann Sales Forecast API — FastAPI + LightGBM
# Deploy on Railway (free tier) or any Python hosting
# ============================================================

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import uvicorn
import os

from model import RossmannModel

# ── App setup ────────────────────────────────────────────────
app = FastAPI(
    title="Rossmann Sales Forecast API",
    description="LightGBM-powered sales predictions for Rossmann stores",
    version="1.0.0",
)

# Allow requests from your Vercel frontend
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Load model once at startup ────────────────────────────────
model = RossmannModel()

@app.on_event("startup")
async def startup_event():
    """Train or load the model when the server starts."""
    print("🚀 Loading Rossmann LightGBM model...")
    model.load_or_train()
    print("✅ Model ready!")


# ── Schemas ───────────────────────────────────────────────────
class PredictRequest(BaseModel):
    store: int
    day_of_week: int         # 1=Mon … 7=Sun
    date: str                # YYYY-MM-DD
    open: int                # 0 or 1
    promo: int               # 0 or 1
    state_holiday: str       # '0', 'a', 'b', 'c'
    school_holiday: int      # 0 or 1


class PredictResponse(BaseModel):
    store: int
    date: str
    predicted_sales: float
    promo_lift_pct: Optional[float]
    model_version: str


# ── Endpoints ─────────────────────────────────────────────────
@app.get("/")
def root():
    return {
        "message": "Rossmann Sales Forecast API is running 🚀",
        "docs": "/docs",
        "endpoints": ["/predict", "/forecast/timeline", "/forecast/by-type",
                      "/forecast/promo-impact", "/forecast/store-ranking", "/health"]
    }


@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": model.is_trained}


@app.post("/predict", response_model=PredictResponse)
def predict_single(req: PredictRequest):
    """Predict sales for a single store on a single day."""
    if not model.is_trained:
        raise HTTPException(status_code=503, detail="Model not yet trained")

    pred = model.predict_one(
        store=req.store,
        day_of_week=req.day_of_week,
        date=req.date,
        open_=req.open,
        promo=req.promo,
        state_holiday=req.state_holiday,
        school_holiday=req.school_holiday,
    )
    # Calculate promo lift by predicting without promo
    pred_no_promo = model.predict_one(
        store=req.store,
        day_of_week=req.day_of_week,
        date=req.date,
        open_=req.open,
        promo=0,
        state_holiday=req.state_holiday,
        school_holiday=req.school_holiday,
    ) if req.promo == 1 else None

    lift = round((pred - pred_no_promo) / pred_no_promo * 100, 2) if pred_no_promo else None

    return PredictResponse(
        store=req.store,
        date=req.date,
        predicted_sales=round(pred, 2),
        promo_lift_pct=lift,
        model_version=model.version,
    )


@app.get("/forecast/timeline")
def forecast_timeline():
    """Returns daily network-wide forecast for the test period."""
    if not model.is_trained:
        raise HTTPException(status_code=503, detail="Model not yet trained")
    return {"data": model.get_timeline_forecast()}


@app.get("/forecast/by-type")
def forecast_by_type():
    """Returns avg predicted sales per store type (promo on vs off)."""
    if not model.is_trained:
        raise HTTPException(status_code=503, detail="Model not yet trained")
    return {"data": model.get_type_forecast()}


@app.get("/forecast/promo-impact")
def forecast_promo_impact():
    """Returns promo lift % and revenue uplift per store type."""
    if not model.is_trained:
        raise HTTPException(status_code=503, detail="Model not yet trained")
    return {"data": model.get_promo_impact()}


@app.get("/forecast/store-ranking")
def forecast_store_ranking(top_n: int = Query(20, ge=1, le=100)):
    """Returns top N stores ranked by predicted daily sales."""
    if not model.is_trained:
        raise HTTPException(status_code=503, detail="Model not yet trained")
    return {"data": model.get_store_ranking(top_n=top_n)}


@app.get("/forecast/heatmap")
def forecast_heatmap():
    """Returns weekly x day-of-week predicted sales heatmap."""
    if not model.is_trained:
        raise HTTPException(status_code=503, detail="Model not yet trained")
    return {"data": model.get_heatmap()}


# ── Run locally ───────────────────────────────────────────────
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
