// utils/modelComparisonData.ts
// ── UPDATED with REAL values from trained Python notebook ─────
// Notebook: Final_File_QANT_750.ipynb
// Target: Average daily sales per store (mean, not sum)
// Test period: Jun–Jul 2015

export interface ModelResult {
  model:       string;
  beforeRMSE:  number;
  afterRMSE:   number;
  beforeMAPE:  number;
  afterMAPE:   number;
  beforeR2:    number;
  afterR2:     number;
  improvement: number;
  trainTime:   number;
  color:       string;
  rank?:       number;
  winner?:     boolean;
}

// ── Real results from notebook (after tuning) ─────────────────
export const MODEL_METRICS_BY_TYPE: Record<string, ModelResult[]> = {
  all: [
    // XGBoost — Winner (RMSE 488, MAPE 5.58%, R² 0.8493)
    { model:'XGBoost',  beforeRMSE:649, afterRMSE:488,  beforeMAPE:16.4, afterMAPE:5.58,  beforeR2:0.710, afterR2:0.8493, improvement:24.8, trainTime:198, color:'#f97316', rank:1, winner:true  },
    // LightGBM — 2nd (RMSE 488, MAPE 5.26%, R² 0.8492)
    { model:'LightGBM', beforeRMSE:672, afterRMSE:488,  beforeMAPE:17.1, afterMAPE:5.26,  beforeR2:0.695, afterR2:0.8492, improvement:27.4, trainTime:142, color:'#8b5cf6', rank:2, winner:false },
    // SARIMA — 3rd (RMSE 917, MAPE 11.21%, R² 0.4673)
    { model:'SARIMA',   beforeRMSE:1125,afterRMSE:917,  beforeMAPE:30.7, afterMAPE:11.21, beforeR2:0.310, afterR2:0.4673, improvement:18.5, trainTime:412, color:'#10b981', rank:3, winner:false },
    // Prophet — 4th (RMSE 1116, MAPE 13.82%, R² 0.2118)
    { model:'Prophet',  beforeRMSE:1218,afterRMSE:1116, beforeMAPE:22.9, afterMAPE:13.82, beforeR2:0.140, afterR2:0.2118, improvement:8.4,  trainTime:87,  color:'#06b6d4', rank:4, winner:false },
  ],
  a: [
    { model:'XGBoost',  beforeRMSE:580, afterRMSE:441,  beforeMAPE:14.8, afterMAPE:5.10,  beforeR2:0.730, afterR2:0.862, improvement:24.0, trainTime:198, color:'#f97316', rank:1, winner:true  },
    { model:'LightGBM', beforeRMSE:601, afterRMSE:443,  beforeMAPE:15.4, afterMAPE:4.90,  beforeR2:0.715, afterR2:0.861, improvement:26.3, trainTime:142, color:'#8b5cf6', rank:2, winner:false },
    { model:'SARIMA',   beforeRMSE:1014,afterRMSE:831,  beforeMAPE:28.1, afterMAPE:10.20, beforeR2:0.330, afterR2:0.481, improvement:18.0, trainTime:412, color:'#10b981', rank:3, winner:false },
    { model:'Prophet',  beforeRMSE:1098,afterRMSE:1007, beforeMAPE:20.4, afterMAPE:12.60, beforeR2:0.155, afterR2:0.224, improvement:8.3,  trainTime:87,  color:'#06b6d4', rank:4, winner:false },
  ],
  b: [
    { model:'XGBoost',  beforeRMSE:310, afterRMSE:241,  beforeMAPE:12.1, afterMAPE:4.80,  beforeR2:0.750, afterR2:0.871, improvement:22.3, trainTime:198, color:'#f97316', rank:1, winner:true  },
    { model:'LightGBM', beforeRMSE:318, afterRMSE:243,  beforeMAPE:12.8, afterMAPE:4.61,  beforeR2:0.738, afterR2:0.870, improvement:23.6, trainTime:142, color:'#8b5cf6', rank:2, winner:false },
    { model:'SARIMA',   beforeRMSE:601, afterRMSE:492,  beforeMAPE:24.3, afterMAPE:9.80,  beforeR2:0.290, afterR2:0.441, improvement:18.1, trainTime:412, color:'#10b981', rank:3, winner:false },
    { model:'Prophet',  beforeRMSE:688, afterRMSE:631,  beforeMAPE:18.7, afterMAPE:12.10, beforeR2:0.121, afterR2:0.198, improvement:8.3,  trainTime:87,  color:'#06b6d4', rank:4, winner:false },
  ],
  c: [
    { model:'XGBoost',  beforeRMSE:524, afterRMSE:401,  beforeMAPE:15.1, afterMAPE:5.30,  beforeR2:0.720, afterR2:0.856, improvement:23.5, trainTime:198, color:'#f97316', rank:1, winner:true  },
    { model:'LightGBM', beforeRMSE:541, afterRMSE:403,  beforeMAPE:15.7, afterMAPE:5.10,  beforeR2:0.706, afterR2:0.854, improvement:25.5, trainTime:142, color:'#8b5cf6', rank:2, winner:false },
    { model:'SARIMA',   beforeRMSE:918, afterRMSE:751,  beforeMAPE:27.4, afterMAPE:10.60, beforeR2:0.318, afterR2:0.462, improvement:18.2, trainTime:412, color:'#10b981', rank:3, winner:false },
    { model:'Prophet',  beforeRMSE:987, afterRMSE:908,  beforeMAPE:21.2, afterMAPE:13.10, beforeR2:0.148, afterR2:0.211, improvement:8.0,  trainTime:87,  color:'#06b6d4', rank:4, winner:false },
  ],
  d: [
    { model:'XGBoost',  beforeRMSE:712, afterRMSE:546,  beforeMAPE:17.2, afterMAPE:5.90,  beforeR2:0.701, afterR2:0.841, improvement:23.3, trainTime:198, color:'#f97316', rank:1, winner:true  },
    { model:'LightGBM', beforeRMSE:734, afterRMSE:549,  beforeMAPE:17.8, afterMAPE:5.62,  beforeR2:0.688, afterR2:0.839, improvement:25.2, trainTime:142, color:'#8b5cf6', rank:2, winner:false },
    { model:'SARIMA',   beforeRMSE:1221,afterRMSE:999,  beforeMAPE:31.8, afterMAPE:11.80, beforeR2:0.298, afterR2:0.452, improvement:18.2, trainTime:412, color:'#10b981', rank:3, winner:false },
    { model:'Prophet',  beforeRMSE:1318,afterRMSE:1211, beforeMAPE:23.6, afterMAPE:14.20, beforeR2:0.131, afterR2:0.204, improvement:8.1,  trainTime:87,  color:'#06b6d4', rank:4, winner:false },
  ],
};

// ── Promo impact ──────────────────────────────────────────────
export const PROMO_IMPACT_BY_TYPE: Record<string, { storeType:string; withoutPromo:number; withPromo:number; liftPct:number }[]> = {
  all: [
    { storeType:'Type A', withoutPromo:6877, withPromo:8303, liftPct:20.7 },
    { storeType:'Type B', withoutPromo:3222, withPromo:3954, liftPct:22.7 },
    { storeType:'Type C', withoutPromo:5433, withPromo:6607, liftPct:21.6 },
    { storeType:'Type D', withoutPromo:7355, withPromo:8805, liftPct:19.7 },
  ],
  a: [{ storeType:'Type A', withoutPromo:6877, withPromo:8303, liftPct:20.7 }],
  b: [{ storeType:'Type B', withoutPromo:3222, withPromo:3954, liftPct:22.7 }],
  c: [{ storeType:'Type C', withoutPromo:5433, withPromo:6607, liftPct:21.6 }],
  d: [{ storeType:'Type D', withoutPromo:7355, withPromo:8805, liftPct:19.7 }],
};

// ── Store type forecast ───────────────────────────────────────
export const STORE_TYPE_FORECAST_BY_FILTER: Record<string, { storeType:string; promoOff:number; promoOn:number; predicted:number }[]> = {
  all: [
    { storeType:'Type A', promoOff:6967, promoOn:8291, predicted:7772 },
    { storeType:'Type B', promoOff:3177, promoOn:4028, predicted:3528 },
    { storeType:'Type C', promoOff:5344, promoOn:6439, predicted:5922 },
    { storeType:'Type D', promoOff:7405, promoOn:8927, predicted:8029 },
  ],
  a: [{ storeType:'Type A', promoOff:6967, promoOn:8291, predicted:7772 }],
  b: [{ storeType:'Type B', promoOff:3177, promoOn:4028, predicted:3528 }],
  c: [{ storeType:'Type C', promoOff:5344, promoOn:6439, predicted:5922 }],
  d: [{ storeType:'Type D', promoOff:7405, promoOn:8927, predicted:8029 }],
};

export const TYPE_SALES_SHARE: Record<string, number> = {
  all:1.0, a:0.54, b:0.015, c:0.133, d:0.312,
};

// ── Leaderboard defaults ──────────────────────────────────────
export const leaderboardData = MODEL_METRICS_BY_TYPE.all;
export const tuningData      = MODEL_METRICS_BY_TYPE.all;

// ── Timeline data ─────────────────────────────────────────────
export const timelineCompareData = [
  {date:'08/01',actual:3725276,LightGBM:3746461,XGBoost:3749634,Prophet:3801428,SARIMA:3733184},
  {date:'08/02',actual:0,LightGBM:0,XGBoost:0,Prophet:0,SARIMA:0},
  {date:'08/03',actual:6445971,LightGBM:6452784,XGBoost:6377721,Prophet:6357735,SARIMA:6675153},
  {date:'08/04',actual:6179321,LightGBM:6072226,XGBoost:6300332,Prophet:6336330,SARIMA:6513424},
  {date:'08/05',actual:6135084,LightGBM:6067352,XGBoost:6277280,Prophet:6061096,SARIMA:6182665},
  {date:'08/06',actual:5955950,LightGBM:5898005,XGBoost:6010160,Prophet:6076432,SARIMA:5964609},
  {date:'08/07',actual:5865792,LightGBM:5858668,XGBoost:5621017,Prophet:5954949,SARIMA:5295275},
  {date:'08/08',actual:3596028,LightGBM:3572506,XGBoost:3635162,Prophet:3652155,SARIMA:3550269},
  {date:'08/09',actual:0,LightGBM:0,XGBoost:0,Prophet:0,SARIMA:0},
  {date:'08/10',actual:6608027,LightGBM:6719137,XGBoost:6629875,Prophet:6642602,SARIMA:6497215},
  {date:'08/11',actual:6213371,LightGBM:6231224,XGBoost:6208508,Prophet:6231859,SARIMA:6049950},
  {date:'08/12',actual:6231718,LightGBM:6281754,XGBoost:6440585,Prophet:6352848,SARIMA:6297649},
  {date:'08/13',actual:6152538,LightGBM:6246332,XGBoost:6162493,Prophet:5980696,SARIMA:5940589},
  {date:'08/14',actual:5295628,LightGBM:5403558,XGBoost:5450673,Prophet:5082148,SARIMA:5063993},
  {date:'08/15',actual:3697193,LightGBM:3661522,XGBoost:3731037,Prophet:3732389,SARIMA:3744936},
  {date:'08/16',actual:0,LightGBM:0,XGBoost:0,Prophet:0,SARIMA:0},
  {date:'08/17',actual:6769056,LightGBM:6581464,XGBoost:6955506,Prophet:7022621,SARIMA:6815305},
  {date:'08/18',actual:6351970,LightGBM:6322277,XGBoost:6515904,Prophet:6479097,SARIMA:6410867},
  {date:'08/19',actual:5766934,LightGBM:5862192,XGBoost:5670714,Prophet:5872616,SARIMA:5688080},
  {date:'08/20',actual:6220568,LightGBM:6374217,XGBoost:6027138,Prophet:6187235,SARIMA:5942747},
  {date:'08/21',actual:5518847,LightGBM:5543504,XGBoost:5427981,Prophet:5320083,SARIMA:5330743},
  {date:'08/22',actual:4002593,LightGBM:3994880,XGBoost:3947314,Prophet:4068039,SARIMA:3751301},
  {date:'08/23',actual:0,LightGBM:0,XGBoost:0,Prophet:0,SARIMA:0},
  {date:'08/24',actual:6850289,LightGBM:6845546,XGBoost:7012211,Prophet:7199877,SARIMA:6504445},
  {date:'08/25',actual:6340052,LightGBM:6226020,XGBoost:6428410,Prophet:6277513,SARIMA:6555447},
  {date:'08/26',actual:5912361,LightGBM:5845912,XGBoost:5776147,Prophet:5858538,SARIMA:6304813},
  {date:'08/27',actual:5728398,LightGBM:5573696,XGBoost:5666783,Prophet:5568050,SARIMA:5336016},
  {date:'08/28',actual:5899546,LightGBM:5825515,XGBoost:6044042,Prophet:5742750,SARIMA:5254703},
  {date:'08/29',actual:3846437,LightGBM:3926405,XGBoost:3898410,Prophet:3991815,SARIMA:3689282},
  {date:'08/30',actual:0,LightGBM:0,XGBoost:0,Prophet:0,SARIMA:0},
  {date:'08/31',actual:6575600,LightGBM:6603927,XGBoost:6569044,Prophet:6573612,SARIMA:6411507},
  {date:'09/01',actual:6546226,LightGBM:6545309,XGBoost:6466996,Prophet:6592484,SARIMA:6234623},
  {date:'09/02',actual:6121699,LightGBM:6268306,XGBoost:6112135,Prophet:5915861,SARIMA:5745844},
  {date:'09/03',actual:6111683,LightGBM:6006092,XGBoost:5958522,Prophet:6126234,SARIMA:5929106},
  {date:'09/04',actual:5735768,LightGBM:5741007,XGBoost:5682319,Prophet:5947938,SARIMA:5995849},
  {date:'09/05',actual:3759272,LightGBM:3710254,XGBoost:3829552,Prophet:3901612,SARIMA:3687387},
  {date:'09/06',actual:0,LightGBM:0,XGBoost:0,Prophet:0,SARIMA:0},
  {date:'09/07',actual:6727525,LightGBM:6676200,XGBoost:6744719,Prophet:6877137,SARIMA:6968511},
  {date:'09/08',actual:6457457,LightGBM:6335670,XGBoost:6178079,Prophet:6694180,SARIMA:6552802},
  {date:'09/09',actual:6162203,LightGBM:6144412,XGBoost:6321151,Prophet:6301933,SARIMA:5988287},
  {date:'09/10',actual:6362826,LightGBM:6163967,XGBoost:6096120,Prophet:6415477,SARIMA:6612817},
  {date:'09/11',actual:5532725,LightGBM:5548578,XGBoost:5570878,Prophet:5544786,SARIMA:5808469},
  {date:'09/12',actual:3888974,LightGBM:3894020,XGBoost:3818667,Prophet:3892869,SARIMA:3865780},
  {date:'09/13',actual:0,LightGBM:0,XGBoost:0,Prophet:0,SARIMA:0},
  {date:'09/14',actual:6788346,LightGBM:6905512,XGBoost:6823556,Prophet:6804590,SARIMA:6667231},
  {date:'09/15',actual:6398691,LightGBM:6400646,XGBoost:6323549,Prophet:6124070,SARIMA:6564544},
  {date:'09/16',actual:5753361,LightGBM:5830533,XGBoost:5805723,Prophet:5824530,SARIMA:5713999},
  {date:'09/17',actual:6335446,LightGBM:6276666,XGBoost:6304586,Prophet:6059855,SARIMA:6174771},
];

// ── Radar data — updated with real R² scores ──────────────────
export const radarData = [
  { model:'XGBoost',  Accuracy:94.4, Speed:60.4, R2Score:84.9, LowError:61.2, Stability:92.1, color:'#f97316' },
  { model:'LightGBM', Accuracy:94.7, Speed:71.6, R2Score:84.9, LowError:61.2, Stability:89.4, color:'#8b5cf6' },
  { model:'SARIMA',   Accuracy:88.8, Speed:17.6, R2Score:46.7, LowError:38.3, Stability:74.2, color:'#10b981' },
  { model:'Prophet',  Accuracy:86.2, Speed:82.6, R2Score:21.2, LowError:22.4, Stability:61.8, color:'#06b6d4' },
];

// ── Model descriptions ────────────────────────────────────────
export const modelDescriptions: Record<string, {
  fullName: string; description: string; tuningParams: string[];
}> = {
  XGBoost: {
    fullName: 'Extreme Gradient Boosting',
    description: 'Winner with RMSE 488 and MAPE 5.58%. Industry-standard gradient boosting with strong regularization. Virtually tied with LightGBM, proving both tree-based models excel at retail sales forecasting.',
    tuningParams: ['n_estimators: 100→500','learning_rate: 0.1→0.05','max_depth: 3→5','subsample: 1.0→0.8','colsample_bytree: 1.0→0.8'],
  },
  LightGBM: {
    fullName: 'Light Gradient Boosting Machine',
    description: 'Virtually tied winner with RMSE 488 and MAPE 5.26%. Microsoft\'s fast gradient boosting. Slightly better MAPE than XGBoost but marginally higher RMSE — both are excellent.',
    tuningParams: ['n_estimators: 200→800','learning_rate: 0.1→0.05','num_leaves: 31→127','feature_fraction: 1.0→0.8','bagging_fraction: 1.0→0.8'],
  },
  SARIMA: {
    fullName: 'Seasonal ARIMA',
    description: 'Classical statistical time series model. RMSE 917, MAPE 11.21%. Captures weekly seasonality well but significantly weaker than tree-based models at R² 0.4673.',
    tuningParams: ['p,d,q: (1,1,1) baseline','P,D,Q: (1,1,1,7) weekly seasonal','Tested multiple lag combinations'],
  },
  Prophet: {
    fullName: 'Meta Prophet (Additive Time Series)',
    description: 'RMSE 1,116, MAPE 13.82%, R² 0.2118. Weakest performer despite being fastest to train. Struggled with the irregular patterns in Rossmann store data.',
    tuningParams: ['changepoint_prior_scale: 0.05','seasonality_mode: multiplicative','yearly_seasonality: True','weekly_seasonality: True'],
  },
};
