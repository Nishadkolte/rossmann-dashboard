// utils/modelComparisonData.ts
// ── Model comparison data — now with per-store-type breakdowns ─

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

// ── Per store-type model metrics ──────────────────────────────
// Each store type has different accuracy because of different
// sales patterns, competition, and promo behaviour
export const MODEL_METRICS_BY_TYPE: Record<string, ModelResult[]> = {
  all: [
    { model:'LightGBM', beforeRMSE:892,  afterRMSE:821,  beforeMAPE:7.4,  afterMAPE:6.8,  beforeR2:0.924, afterR2:0.934, improvement:8.0,  trainTime:142, color:'#8b5cf6', rank:1, winner:true  },
    { model:'XGBoost',  beforeRMSE:941,  afterRMSE:856,  beforeMAPE:8.1,  afterMAPE:7.2,  beforeR2:0.911, afterR2:0.928, improvement:9.0,  trainTime:198, color:'#f97316', rank:2, winner:false },
    { model:'Prophet',  beforeRMSE:1143, afterRMSE:1021, beforeMAPE:9.8,  afterMAPE:8.7,  beforeR2:0.878, afterR2:0.897, improvement:10.7, trainTime:87,  color:'#06b6d4', rank:3, winner:false },
    { model:'SARIMA',   beforeRMSE:1387, afterRMSE:1198, beforeMAPE:12.3, afterMAPE:10.6, beforeR2:0.831, afterR2:0.864, improvement:13.6, trainTime:412, color:'#10b981', rank:4, winner:false },
  ],
  // Type A — hypermarket, most data, best accuracy
  a: [
    { model:'LightGBM', beforeRMSE:812,  afterRMSE:748,  beforeMAPE:6.8,  afterMAPE:6.1,  beforeR2:0.938, afterR2:0.948, improvement:7.9,  trainTime:142, color:'#8b5cf6', rank:1, winner:true  },
    { model:'XGBoost',  beforeRMSE:867,  afterRMSE:791,  beforeMAPE:7.4,  afterMAPE:6.6,  beforeR2:0.924, afterR2:0.937, improvement:8.8,  trainTime:198, color:'#f97316', rank:2, winner:false },
    { model:'Prophet',  beforeRMSE:1041, afterRMSE:934,  beforeMAPE:9.1,  afterMAPE:8.0,  beforeR2:0.891, afterR2:0.910, improvement:10.3, trainTime:87,  color:'#06b6d4', rank:3, winner:false },
    { model:'SARIMA',   beforeRMSE:1264, afterRMSE:1089, beforeMAPE:11.4, afterMAPE:9.8,  beforeR2:0.847, afterR2:0.878, improvement:13.8, trainTime:412, color:'#10b981', rank:4, winner:false },
  ],
  // Type B — convenience, least data, hardest to predict
  b: [
    { model:'LightGBM', beforeRMSE:621,  afterRMSE:578,  beforeMAPE:8.9,  afterMAPE:8.1,  beforeR2:0.891, afterR2:0.904, improvement:6.9,  trainTime:142, color:'#8b5cf6', rank:1, winner:true  },
    { model:'XGBoost',  beforeRMSE:658,  afterRMSE:612,  beforeMAPE:9.4,  afterMAPE:8.6,  beforeR2:0.878, afterR2:0.894, improvement:7.0,  trainTime:198, color:'#f97316', rank:2, winner:false },
    { model:'Prophet',  beforeRMSE:812,  afterRMSE:741,  beforeMAPE:11.6, afterMAPE:10.4, beforeR2:0.834, afterR2:0.856, improvement:8.7,  trainTime:87,  color:'#06b6d4', rank:3, winner:false },
    { model:'SARIMA',   beforeRMSE:994,  afterRMSE:867,  beforeMAPE:14.2, afterMAPE:12.6, beforeR2:0.791, afterR2:0.821, improvement:12.8, trainTime:412, color:'#10b981', rank:4, winner:false },
  ],
  // Type C — drug/health, moderate data
  c: [
    { model:'LightGBM', beforeRMSE:741,  afterRMSE:684,  beforeMAPE:7.1,  afterMAPE:6.4,  beforeR2:0.931, afterR2:0.941, improvement:7.7,  trainTime:142, color:'#8b5cf6', rank:1, winner:true  },
    { model:'XGBoost',  beforeRMSE:789,  afterRMSE:724,  beforeMAPE:7.8,  afterMAPE:7.0,  beforeR2:0.917, afterR2:0.930, improvement:8.2,  trainTime:198, color:'#f97316', rank:2, winner:false },
    { model:'Prophet',  beforeRMSE:962,  afterRMSE:861,  beforeMAPE:9.4,  afterMAPE:8.3,  beforeR2:0.882, afterR2:0.901, improvement:10.5, trainTime:87,  color:'#06b6d4', rank:3, winner:false },
    { model:'SARIMA',   beforeRMSE:1167, afterRMSE:1014, beforeMAPE:11.9, afterMAPE:10.2, beforeR2:0.839, afterR2:0.869, improvement:13.1, trainTime:412, color:'#10b981', rank:4, winner:false },
  ],
  // Type D — department store, high sales volume
  d: [
    { model:'LightGBM', beforeRMSE:1024, afterRMSE:941,  beforeMAPE:7.8,  afterMAPE:7.1,  beforeR2:0.918, afterR2:0.929, improvement:8.1,  trainTime:142, color:'#8b5cf6', rank:1, winner:true  },
    { model:'XGBoost',  beforeRMSE:1087, afterRMSE:994,  beforeMAPE:8.4,  afterMAPE:7.6,  beforeR2:0.904, afterR2:0.919, improvement:8.6,  trainTime:198, color:'#f97316', rank:2, winner:false },
    { model:'Prophet',  beforeRMSE:1318, afterRMSE:1178, beforeMAPE:10.2, afterMAPE:9.1,  beforeR2:0.869, afterR2:0.889, improvement:10.6, trainTime:87,  color:'#06b6d4', rank:3, winner:false },
    { model:'SARIMA',   beforeRMSE:1601, afterRMSE:1384, beforeMAPE:13.1, afterMAPE:11.4, beforeR2:0.821, afterR2:0.854, improvement:13.5, trainTime:412, color:'#10b981', rank:4, winner:false },
  ],
};

// ── Per store-type promo impact ───────────────────────────────
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

// ── Per store-type forecast — sales by store type chart ───────
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

// ── Timeline data stays the same (network-wide) ───────────────
// but we scale it by store type's share of network
export const TYPE_SALES_SHARE: Record<string, number> = {
  all: 1.0,
  a:   0.54,  // 602/1115
  b:   0.015, // 17/1115
  c:   0.133, // 148/1115
  d:   0.312, // 348/1115
};

// ── Leaderboard (all stores, used as default) ─────────────────
export const leaderboardData = MODEL_METRICS_BY_TYPE.all;
export const tuningData      = MODEL_METRICS_BY_TYPE.all;

// ── Timeline compare data ─────────────────────────────────────
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

// ── Radar data ────────────────────────────────────────────────
export const radarData = [
  { model:'LightGBM', Accuracy:93.2, Speed:71.6, R2Score:93.4, LowError:45.3, Stability:87.0, color:'#8b5cf6' },
  { model:'XGBoost',  Accuracy:92.8, Speed:60.4, R2Score:92.8, LowError:42.9, Stability:90.7, color:'#f97316' },
  { model:'Prophet',  Accuracy:91.3, Speed:82.6, R2Score:89.7, LowError:31.9, Stability:73.9, color:'#06b6d4' },
  { model:'SARIMA',   Accuracy:89.4, Speed:17.6, R2Score:86.4, LowError:20.1, Stability:87.6, color:'#10b981' },
];

// ── Model descriptions ────────────────────────────────────────
export const modelDescriptions: Record<string, {
  fullName: string; description: string; tuningParams: string[];
}> = {
  LightGBM: {
    fullName: 'Light Gradient Boosting Machine',
    description: 'Microsoft\'s fast gradient boosting framework. Handles categorical features natively and trains faster than XGBoost with comparable accuracy.',
    tuningParams: ['num_leaves: 31→127','learning_rate: 0.1→0.05','n_estimators: 200→800','feature_fraction: 1.0→0.8'],
  },
  XGBoost: {
    fullName: 'Extreme Gradient Boosting',
    description: 'Industry-standard gradient boosting with strong regularization. Highly stable and battle-tested across thousands of Kaggle competitions.',
    tuningParams: ['max_depth: 3→6','learning_rate: 0.1→0.08','n_estimators: 100→600','subsample: 1.0→0.8'],
  },
  Prophet: {
    fullName: 'Meta Prophet (Additive Time Series)',
    description: 'Developed by Meta for business forecasting. Decomposes trends, weekly/yearly seasonality, and holiday effects automatically.',
    tuningParams: ['changepoint_prior_scale: 0.05→0.01','seasonality_mode: additive→multiplicative','holidays: German public holidays added'],
  },
  SARIMA: {
    fullName: 'Seasonal ARIMA',
    description: 'Classical statistical model capturing autoregressive, integrated, and moving average components with seasonal differencing.',
    tuningParams: ['p,d,q: (1,1,1)→(2,1,1)','P,D,Q: (0,1,0)→(1,1,1)','seasonal period s: 7 (weekly)'],
  },
};
