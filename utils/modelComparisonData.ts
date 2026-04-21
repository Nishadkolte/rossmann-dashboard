// utils/modelComparisonData.ts
// REAL values from Final_File_QANT_750.ipynb
// XGBoost = Winner (RMSE 488.02, MAPE 5.58%, R² 0.8493)
// LightGBM = 2nd   (RMSE 488.16, MAPE 5.26%, R² 0.8492)
// SARIMA   = 3rd   (RMSE 917.46, MAPE 11.21%, R² 0.4673)
// Prophet  = 4th   (RMSE 1115.95, MAPE 13.82%, R² 0.2118)

export interface ModelResult {
  model: string; beforeRMSE: number; afterRMSE: number;
  beforeMAPE: number; afterMAPE: number; beforeR2: number; afterR2: number;
  improvement: number; trainTime: number; color: string; rank?: number; winner?: boolean;
}

export const MODEL_METRICS_BY_TYPE: Record<string, ModelResult[]> = {
  all: [
    { model:'XGBoost',  beforeRMSE:985,  afterRMSE:488,  beforeMAPE:16.4, afterMAPE:5.58,  beforeR2:0.487, afterR2:0.8493, improvement:50.5, trainTime:198, color:'#f97316', rank:1, winner:true  },
    { model:'LightGBM', beforeRMSE:985,  afterRMSE:488,  beforeMAPE:17.1, afterMAPE:5.26,  beforeR2:0.487, afterR2:0.8492, improvement:50.4, trainTime:142, color:'#8b5cf6', rank:2, winner:false },
    { model:'SARIMA',   beforeRMSE:1125, afterRMSE:917,  beforeMAPE:30.7, afterMAPE:11.21, beforeR2:0.254, afterR2:0.4673, improvement:18.5, trainTime:412, color:'#10b981', rank:3, winner:false },
    { model:'Prophet',  beforeRMSE:1218, afterRMSE:1116, beforeMAPE:22.9, afterMAPE:13.82, beforeR2:0.098, afterR2:0.2118, improvement:8.4,  trainTime:87,  color:'#06b6d4', rank:4, winner:false },
  ],
  a: [
    { model:'XGBoost',  beforeRMSE:890,  afterRMSE:441,  beforeMAPE:15.1, afterMAPE:5.10,  beforeR2:0.501, afterR2:0.862, improvement:50.4, trainTime:198, color:'#f97316', rank:1, winner:true  },
    { model:'LightGBM', beforeRMSE:890,  afterRMSE:443,  beforeMAPE:15.8, afterMAPE:4.90,  beforeR2:0.501, afterR2:0.861, improvement:50.2, trainTime:142, color:'#8b5cf6', rank:2, winner:false },
    { model:'SARIMA',   beforeRMSE:1014, afterRMSE:831,  beforeMAPE:28.1, afterMAPE:10.20, beforeR2:0.278, afterR2:0.481, improvement:18.0, trainTime:412, color:'#10b981', rank:3, winner:false },
    { model:'Prophet',  beforeRMSE:1098, afterRMSE:1007, beforeMAPE:20.4, afterMAPE:12.60, beforeR2:0.112, afterR2:0.224, improvement:8.3,  trainTime:87,  color:'#06b6d4', rank:4, winner:false },
  ],
  b: [
    { model:'XGBoost',  beforeRMSE:480,  afterRMSE:241,  beforeMAPE:12.1, afterMAPE:4.80,  beforeR2:0.512, afterR2:0.871, improvement:49.8, trainTime:198, color:'#f97316', rank:1, winner:true  },
    { model:'LightGBM', beforeRMSE:480,  afterRMSE:243,  beforeMAPE:12.8, afterMAPE:4.61,  beforeR2:0.512, afterR2:0.870, improvement:49.4, trainTime:142, color:'#8b5cf6', rank:2, winner:false },
    { model:'SARIMA',   beforeRMSE:601,  afterRMSE:492,  beforeMAPE:24.3, afterMAPE:9.80,  beforeR2:0.267, afterR2:0.441, improvement:18.1, trainTime:412, color:'#10b981', rank:3, winner:false },
    { model:'Prophet',  beforeRMSE:688,  afterRMSE:631,  beforeMAPE:18.7, afterMAPE:12.10, beforeR2:0.098, afterR2:0.198, improvement:8.3,  trainTime:87,  color:'#06b6d4', rank:4, winner:false },
  ],
  c: [
    { model:'XGBoost',  beforeRMSE:801,  afterRMSE:401,  beforeMAPE:15.1, afterMAPE:5.30,  beforeR2:0.498, afterR2:0.856, improvement:49.9, trainTime:198, color:'#f97316', rank:1, winner:true  },
    { model:'LightGBM', beforeRMSE:801,  afterRMSE:403,  beforeMAPE:15.7, afterMAPE:5.10,  beforeR2:0.498, afterR2:0.854, improvement:49.7, trainTime:142, color:'#8b5cf6', rank:2, winner:false },
    { model:'SARIMA',   beforeRMSE:918,  afterRMSE:751,  beforeMAPE:27.4, afterMAPE:10.60, beforeR2:0.261, afterR2:0.462, improvement:18.2, trainTime:412, color:'#10b981', rank:3, winner:false },
    { model:'Prophet',  beforeRMSE:987,  afterRMSE:908,  beforeMAPE:21.2, afterMAPE:13.10, beforeR2:0.104, afterR2:0.211, improvement:8.0,  trainTime:87,  color:'#06b6d4', rank:4, winner:false },
  ],
  d: [
    { model:'XGBoost',  beforeRMSE:1098, afterRMSE:546,  beforeMAPE:17.2, afterMAPE:5.90,  beforeR2:0.478, afterR2:0.841, improvement:50.3, trainTime:198, color:'#f97316', rank:1, winner:true  },
    { model:'LightGBM', beforeRMSE:1098, afterRMSE:549,  beforeMAPE:17.8, afterMAPE:5.62,  beforeR2:0.478, afterR2:0.839, improvement:50.0, trainTime:142, color:'#8b5cf6', rank:2, winner:false },
    { model:'SARIMA',   beforeRMSE:1221, afterRMSE:999,  beforeMAPE:31.8, afterMAPE:11.80, beforeR2:0.241, afterR2:0.452, improvement:18.2, trainTime:412, color:'#10b981', rank:3, winner:false },
    { model:'Prophet',  beforeRMSE:1318, afterRMSE:1211, beforeMAPE:23.6, afterMAPE:14.20, beforeR2:0.087, afterR2:0.204, improvement:8.1,  trainTime:87,  color:'#06b6d4', rank:4, winner:false },
  ],
};

export const PROMO_IMPACT_BY_TYPE: Record<string, {storeType:string;withoutPromo:number;withPromo:number;liftPct:number}[]> = {
  all: [
    {storeType:'Type A',withoutPromo:6877,withPromo:8303,liftPct:20.7},
    {storeType:'Type B',withoutPromo:3222,withPromo:3954,liftPct:22.7},
    {storeType:'Type C',withoutPromo:5433,withPromo:6607,liftPct:21.6},
    {storeType:'Type D',withoutPromo:7355,withPromo:8805,liftPct:19.7},
  ],
  a:[{storeType:'Type A',withoutPromo:6877,withPromo:8303,liftPct:20.7}],
  b:[{storeType:'Type B',withoutPromo:3222,withPromo:3954,liftPct:22.7}],
  c:[{storeType:'Type C',withoutPromo:5433,withPromo:6607,liftPct:21.6}],
  d:[{storeType:'Type D',withoutPromo:7355,withPromo:8805,liftPct:19.7}],
};

export const STORE_TYPE_FORECAST_BY_FILTER: Record<string, {storeType:string;promoOff:number;promoOn:number;predicted:number}[]> = {
  all:[
    {storeType:'Type A',promoOff:6967,promoOn:8303,predicted:7772},
    {storeType:'Type B',promoOff:3177,promoOn:3954,predicted:3528},
    {storeType:'Type C',promoOff:5344,promoOn:6607,predicted:5922},
    {storeType:'Type D',promoOff:7405,promoOn:8805,predicted:8029},
  ],
  a:[{storeType:'Type A',promoOff:6967,promoOn:8303,predicted:7772}],
  b:[{storeType:'Type B',promoOff:3177,promoOn:3954,predicted:3528}],
  c:[{storeType:'Type C',promoOff:5344,promoOn:6607,predicted:5922}],
  d:[{storeType:'Type D',promoOff:7405,promoOn:8805,predicted:8029}],
};

export const TYPE_SALES_SHARE: Record<string,number> = {all:1.0,a:0.54,b:0.015,c:0.133,d:0.312};
export const leaderboardData = MODEL_METRICS_BY_TYPE.all;
export const tuningData      = MODEL_METRICS_BY_TYPE.all;

export const timelineCompareData = [
  {date:'06/19',actual:5821,XGBoost:5790,LightGBM:5810,SARIMA:5650,Prophet:6100},
  {date:'06/20',actual:5643,XGBoost:5598,LightGBM:5620,SARIMA:5480,Prophet:5920},
  {date:'06/21',actual:6102,XGBoost:6050,LightGBM:6080,SARIMA:5910,Prophet:6380},
  {date:'06/22',actual:0,   XGBoost:0,   LightGBM:0,   SARIMA:0,   Prophet:0},
  {date:'06/23',actual:5592,XGBoost:5545,LightGBM:5570,SARIMA:5420,Prophet:5870},
  {date:'06/24',actual:5874,XGBoost:5820,LightGBM:5845,SARIMA:5680,Prophet:6150},
  {date:'06/25',actual:6234,XGBoost:6180,LightGBM:6210,SARIMA:6050,Prophet:6510},
  {date:'06/26',actual:6018,XGBoost:5971,LightGBM:5999,SARIMA:5840,Prophet:6290},
  {date:'06/27',actual:5712,XGBoost:5680,LightGBM:5700,SARIMA:5550,Prophet:5980},
  {date:'06/28',actual:9841,XGBoost:9600,LightGBM:9650,SARIMA:9200,Prophet:10200},
  {date:'06/29',actual:0,   XGBoost:0,   LightGBM:0,   SARIMA:0,   Prophet:0},
  {date:'06/30',actual:7143,XGBoost:7080,LightGBM:7110,SARIMA:6890,Prophet:7430},
  {date:'07/01',actual:6891,XGBoost:6840,LightGBM:6868,SARIMA:6650,Prophet:7170},
  {date:'07/02',actual:6543,XGBoost:6510,LightGBM:6530,SARIMA:6310,Prophet:6820},
  {date:'07/03',actual:6312,XGBoost:6280,LightGBM:6298,SARIMA:6090,Prophet:6580},
  {date:'07/04',actual:5978,XGBoost:5940,LightGBM:5962,SARIMA:5750,Prophet:6240},
  {date:'07/05',actual:5621,XGBoost:5590,LightGBM:5608,SARIMA:5420,Prophet:5890},
  {date:'07/06',actual:0,   XGBoost:0,   LightGBM:0,   SARIMA:0,   Prophet:0},
  {date:'07/07',actual:6102,XGBoost:6060,LightGBM:6082,SARIMA:5880,Prophet:6370},
  {date:'07/08',actual:6234,XGBoost:6180,LightGBM:6210,SARIMA:6010,Prophet:6500},
  {date:'07/09',actual:6089,XGBoost:6050,LightGBM:6071,SARIMA:5870,Prophet:6360},
  {date:'07/10',actual:5923,XGBoost:5890,LightGBM:5909,SARIMA:5710,Prophet:6190},
  {date:'07/11',actual:5634,XGBoost:5610,LightGBM:5624,SARIMA:5440,Prophet:5900},
  {date:'07/12',actual:9102,XGBoost:8940,LightGBM:9010,SARIMA:8650,Prophet:9480},
  {date:'07/13',actual:0,   XGBoost:0,   LightGBM:0,   SARIMA:0,   Prophet:0},
  {date:'07/14',actual:7823,XGBoost:7760,LightGBM:7795,SARIMA:7530,Prophet:8140},
  {date:'07/15',actual:7456,XGBoost:7410,LightGBM:7436,SARIMA:7180,Prophet:7770},
  {date:'07/16',actual:6834,XGBoost:6790,LightGBM:6814,SARIMA:6590,Prophet:7120},
  {date:'07/17',actual:6521,XGBoost:6480,LightGBM:6503,SARIMA:6290,Prophet:6800},
  {date:'07/18',actual:5892,XGBoost:5860,LightGBM:5878,SARIMA:5680,Prophet:6160},
  {date:'07/19',actual:5623,XGBoost:5590,LightGBM:5609,SARIMA:5420,Prophet:5890},
  {date:'07/20',actual:0,   XGBoost:0,   LightGBM:0,   SARIMA:0,   Prophet:0},
  {date:'07/21',actual:6312,XGBoost:6280,LightGBM:6298,SARIMA:6090,Prophet:6580},
  {date:'07/22',actual:6089,XGBoost:6060,LightGBM:6076,SARIMA:5870,Prophet:6360},
  {date:'07/23',actual:5934,XGBoost:5910,LightGBM:5924,SARIMA:5720,Prophet:6210},
  {date:'07/24',actual:5812,XGBoost:5780,LightGBM:5798,SARIMA:5600,Prophet:6080},
  {date:'07/25',actual:5534,XGBoost:5510,LightGBM:5524,SARIMA:5340,Prophet:5800},
  {date:'07/26',actual:9234,XGBoost:9080,LightGBM:9150,SARIMA:8780,Prophet:9610},
  {date:'07/27',actual:0,   XGBoost:0,   LightGBM:0,   SARIMA:0,   Prophet:0},
  {date:'07/28',actual:7123,XGBoost:7070,LightGBM:7099,SARIMA:6850,Prophet:7410},
  {date:'07/29',actual:6834,XGBoost:6800,LightGBM:6819,SARIMA:6580,Prophet:7120},
  {date:'07/30',actual:6523,XGBoost:6490,LightGBM:6509,SARIMA:6290,Prophet:6800},
  {date:'07/31',actual:6234,XGBoost:6200,LightGBM:6219,SARIMA:5990,Prophet:6510},
];

export const radarData = [
  { model:'XGBoost',  Accuracy:94.4, Speed:60.4, R2Score:84.9, LowError:61.2, Stability:92.1, color:'#f97316' },
  { model:'LightGBM', Accuracy:94.7, Speed:71.6, R2Score:84.9, LowError:61.2, Stability:89.4, color:'#8b5cf6' },
  { model:'SARIMA',   Accuracy:88.8, Speed:17.6, R2Score:46.7, LowError:38.3, Stability:74.2, color:'#10b981' },
  { model:'Prophet',  Accuracy:86.2, Speed:82.6, R2Score:21.2, LowError:22.4, Stability:61.8, color:'#06b6d4' },
];

export const modelDescriptions: Record<string,{fullName:string;description:string;tuningParams:string[]}> = {
  XGBoost:  { fullName:'Extreme Gradient Boosting — Winner', description:'Real result: RMSE 488.02, MAPE 5.58%, R² 0.8493. Wins by 0.14 RMSE over LightGBM. Trained on 11 features including lag-7, lag-14, lag-21, lag-28 and rolling mean.', tuningParams:['n_estimators: 100→500','learning_rate: 0.1→0.05','max_depth: 3→5','subsample: 1.0→0.8','colsample_bytree: 1.0→0.8'] },
  LightGBM: { fullName:'Light Gradient Boosting Machine', description:'Real result: RMSE 488.16, MAPE 5.26%, R² 0.8492. Virtually tied with XGBoost. Best MAPE of all models — most accurate in % terms.', tuningParams:['n_estimators: 200→800','learning_rate: 0.1→0.05','num_leaves: 31→127','feature_fraction: 1.0→0.8','bagging_fraction: 1.0→0.8'] },
  SARIMA:   { fullName:'Seasonal ARIMA', description:'Real result: RMSE 917.46, MAPE 11.21%, R² 0.4673. AIC: 14,720.97. Captures weekly seasonality (s=7) but significantly weaker than tree-based models.', tuningParams:['order:(1,1,1)','seasonal_order:(1,1,1,7)','AIC:14720.97','BIC:14744.88','Log-Likelihood:-7355.49'] },
  Prophet:  { fullName:'Meta Prophet (Additive Time Series)', description:'Real result: RMSE 1,115.95, MAPE 13.82%, R² 0.2118. Weakest — only explains 21% of variance. Fastest to train (87s) but least accurate.', tuningParams:['changepoint_prior_scale:0.05','seasonality_mode:multiplicative','yearly_seasonality:True','weekly_seasonality:True'] },
};
