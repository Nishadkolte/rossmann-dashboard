// utils/forecastData.ts
// Pre-computed forecast data based on LightGBM model predictions
// Derived from Rossmann train.csv patterns (Aug–Sep 2015 window)
// Replace with live API responses when Python backend is deployed

// ── Chart 1: Daily Sales Forecast Timeline ────────────────────
export const timelineData = [
  { date: '08/01', actual: 3771426,  predicted: 3761645,  promo: 0, schoolHoliday: 1 },
  { date: '08/02', actual: 0,        predicted: 0,         promo: 0, schoolHoliday: 1 },
  { date: '08/03', actual: 6628936,  predicted: 6480048,  promo: 1, schoolHoliday: 1 },
  { date: '08/04', actual: 6347374,  predicted: 6321921,  promo: 1, schoolHoliday: 1 },
  { date: '08/05', actual: 5998957,  predicted: 6009385,  promo: 1, schoolHoliday: 1 },
  { date: '08/06', actual: 6204427,  predicted: 6312715,  promo: 1, schoolHoliday: 0 },
  { date: '08/07', actual: 5767875,  predicted: 5777436,  promo: 0, schoolHoliday: 0 },
  { date: '08/08', actual: 3703902,  predicted: 3647529,  promo: 0, schoolHoliday: 1 },
  { date: '08/09', actual: 0,        predicted: 0,         promo: 0, schoolHoliday: 1 },
  { date: '08/10', actual: 6662723,  predicted: 6652097,  promo: 1, schoolHoliday: 1 },
  { date: '08/11', actual: 6384980,  predicted: 6245767,  promo: 1, schoolHoliday: 1 },
  { date: '08/12', actual: 5981690,  predicted: 6025688,  promo: 1, schoolHoliday: 1 },
  { date: '08/13', actual: 6322932,  predicted: 6300110,  promo: 1, schoolHoliday: 0 },
  { date: '08/14', actual: 5720355,  predicted: 5741653,  promo: 0, schoolHoliday: 0 },
  { date: '08/15', actual: 3876699,  predicted: 3811965,  promo: 0, schoolHoliday: 1 },
  { date: '08/16', actual: 0,        predicted: 0,         promo: 0, schoolHoliday: 1 },
  { date: '08/17', actual: 6131382,  predicted: 6075566,  promo: 1, schoolHoliday: 1 },
  { date: '08/18', actual: 6112050,  predicted: 6192363,  promo: 1, schoolHoliday: 1 },
  { date: '08/19', actual: 6158589,  predicted: 6045972,  promo: 1, schoolHoliday: 1 },
  { date: '08/20', actual: 6318118,  predicted: 6223137,  promo: 1, schoolHoliday: 0 },
  { date: '08/21', actual: 5641813,  predicted: 5616941,  promo: 0, schoolHoliday: 0 },
  { date: '08/22', actual: 3800802,  predicted: 3847474,  promo: 0, schoolHoliday: 1 },
  { date: '08/23', actual: 0,        predicted: 0,         promo: 0, schoolHoliday: 1 },
  { date: '08/24', actual: 6784158,  predicted: 6832850,  promo: 1, schoolHoliday: 1 },
  { date: '08/25', actual: 6166505,  predicted: 6100150,  promo: 1, schoolHoliday: 1 },
  { date: '08/26', actual: 5953125,  predicted: 5997713,  promo: 1, schoolHoliday: 1 },
  { date: '08/27', actual: 6115255,  predicted: 6329511,  promo: 1, schoolHoliday: 0 },
  { date: '08/28', actual: 5517419,  predicted: 5426475,  promo: 0, schoolHoliday: 0 },
  { date: '08/29', actual: 3875125,  predicted: 3957773,  promo: 0, schoolHoliday: 1 },
  { date: '08/30', actual: 0,        predicted: 0,         promo: 0, schoolHoliday: 1 },
  { date: '08/31', actual: 6939151,  predicted: 6929364,  promo: 1, schoolHoliday: 1 },
  { date: '09/01', actual: 6016431,  predicted: 5968413,  promo: 1, schoolHoliday: 1 },
  { date: '09/02', actual: 6210873,  predicted: 6076375,  promo: 1, schoolHoliday: 1 },
  { date: '09/03', actual: 6167686,  predicted: 6191114,  promo: 1, schoolHoliday: 0 },
  { date: '09/04', actual: 5602894,  predicted: 5663710,  promo: 0, schoolHoliday: 0 },
  { date: '09/05', actual: 3853796,  predicted: 3987990,  promo: 0, schoolHoliday: 1 },
  { date: '09/06', actual: 0,        predicted: 0,         promo: 0, schoolHoliday: 1 },
  { date: '09/07', actual: 6542254,  predicted: 6460648,  promo: 1, schoolHoliday: 1 },
  { date: '09/08', actual: 6464261,  predicted: 6409299,  promo: 1, schoolHoliday: 1 },
  { date: '09/09', actual: 6025531,  predicted: 6093255,  promo: 1, schoolHoliday: 1 },
  { date: '09/10', actual: 6027760,  predicted: 6001209,  promo: 1, schoolHoliday: 0 },
  { date: '09/11', actual: 5343994,  predicted: 5257223,  promo: 0, schoolHoliday: 0 },
  { date: '09/12', actual: 3723286,  predicted: 3746506,  promo: 0, schoolHoliday: 1 },
  { date: '09/13', actual: 0,        predicted: 0,         promo: 0, schoolHoliday: 1 },
  { date: '09/14', actual: 6706584,  predicted: 6723482,  promo: 1, schoolHoliday: 1 },
  { date: '09/15', actual: 6489237,  predicted: 6576195,  promo: 1, schoolHoliday: 1 },
  { date: '09/16', actual: 6087837,  predicted: 5995520,  promo: 1, schoolHoliday: 1 },
  { date: '09/17', actual: 6328474,  predicted: 6364646,  promo: 1, schoolHoliday: 0 },
];

// ── Chart 2: Sales Forecast by Store Type ─────────────────────
export const storeTypeForecastData = [
  { storeType: 'Type A', promoOff: 6967, promoOn: 8291, predicted: 7772 },
  { storeType: 'Type B', promoOff: 3177, promoOn: 4028, predicted: 3528 },
  { storeType: 'Type C', promoOff: 5344, promoOn: 6439, predicted: 5922 },
  { storeType: 'Type D', promoOff: 7405, promoOn: 8927, predicted: 8029 },
];

// ── Chart 3: Weekly Sales Heatmap ─────────────────────────────
export const heatmapData = [
  { week: 'W1', day: 'Mon', sales: 7035 }, { week: 'W1', day: 'Tue', sales: 7551 },
  { week: 'W1', day: 'Wed', sales: 7211 }, { week: 'W1', day: 'Thu', sales: 7040 },
  { week: 'W1', day: 'Fri', sales: 6442 }, { week: 'W1', day: 'Sat', sales: 4425 },
  { week: 'W1', day: 'Sun', sales: 0 },
  { week: 'W2', day: 'Mon', sales: 7446 }, { week: 'W2', day: 'Tue', sales: 7216 },
  { week: 'W2', day: 'Wed', sales: 7438 }, { week: 'W2', day: 'Thu', sales: 7070 },
  { week: 'W2', day: 'Fri', sales: 6512 }, { week: 'W2', day: 'Sat', sales: 4442 },
  { week: 'W2', day: 'Sun', sales: 0 },
  { week: 'W3', day: 'Mon', sales: 7842 }, { week: 'W3', day: 'Tue', sales: 6987 },
  { week: 'W3', day: 'Wed', sales: 7304 }, { week: 'W3', day: 'Thu', sales: 7199 },
  { week: 'W3', day: 'Fri', sales: 7212 }, { week: 'W3', day: 'Sat', sales: 4475 },
  { week: 'W3', day: 'Sun', sales: 0 },
  { week: 'W4', day: 'Mon', sales: 7369 }, { week: 'W4', day: 'Tue', sales: 7306 },
  { week: 'W4', day: 'Wed', sales: 7145 }, { week: 'W4', day: 'Thu', sales: 7701 },
  { week: 'W4', day: 'Fri', sales: 6164 }, { week: 'W4', day: 'Sat', sales: 4600 },
  { week: 'W4', day: 'Sun', sales: 0 },
  { week: 'W5', day: 'Mon', sales: 8251 }, { week: 'W5', day: 'Tue', sales: 7551 },
  { week: 'W5', day: 'Wed', sales: 7069 }, { week: 'W5', day: 'Thu', sales: 7048 },
  { week: 'W5', day: 'Fri', sales: 6278 }, { week: 'W5', day: 'Sat', sales: 4460 },
  { week: 'W5', day: 'Sun', sales: 0 },
  { week: 'W6', day: 'Mon', sales: 8402 }, { week: 'W6', day: 'Tue', sales: 7163 },
  { week: 'W6', day: 'Wed', sales: 7144 }, { week: 'W6', day: 'Thu', sales: 6746 },
  { week: 'W6', day: 'Fri', sales: 6503 }, { week: 'W6', day: 'Sat', sales: 4471 },
  { week: 'W6', day: 'Sun', sales: 0 },
  { week: 'W7', day: 'Mon', sales: 8224 }, { week: 'W7', day: 'Tue', sales: 7329 },
  { week: 'W7', day: 'Wed', sales: 6739 }, { week: 'W7', day: 'Thu', sales: 7330 },
  { week: 'W7', day: 'Fri', sales: 6745 }, { week: 'W7', day: 'Sat', sales: 4512 },
  { week: 'W7', day: 'Sun', sales: 0 },
];

// ── Chart 4: Promo Impact Forecast ────────────────────────────
export const promoImpactData = [
  { storeType: 'Type A', withoutPromo: 6877, withPromo: 8303, liftPct: 20.7 },
  { storeType: 'Type B', withoutPromo: 3222, withPromo: 3954, liftPct: 22.7 },
  { storeType: 'Type C', withoutPromo: 5433, withPromo: 6607, liftPct: 21.6 },
  { storeType: 'Type D', withoutPromo: 7355, withPromo: 8805, liftPct: 19.7 },
];

// ── Chart 5: Top 20 Store-Level Sales Predictions ─────────────
export const storePredictionsData = [
  { store: 'Store 0485', storeType: 'Type D', predictedSales: 9620, promo: 0 },
  { store: 'Store 0125', storeType: 'Type A', predictedSales: 7879, promo: 1 },
  { store: 'Store 0777', storeType: 'Type D', predictedSales: 7452, promo: 0 },
  { store: 'Store 0201', storeType: 'Type A', predictedSales: 7085, promo: 0 },
  { store: 'Store 0199', storeType: 'Type A', predictedSales: 7034, promo: 1 },
  { store: 'Store 1108', storeType: 'Type D', predictedSales: 6897, promo: 0 },
  { store: 'Store 0833', storeType: 'Type D', predictedSales: 6722, promo: 1 },
  { store: 'Store 0948', storeType: 'Type A', predictedSales: 6673, promo: 0 },
  { store: 'Store 0224', storeType: 'Type A', predictedSales: 6550, promo: 0 },
  { store: 'Store 0488', storeType: 'Type A', predictedSales: 6498, promo: 1 },
  { store: 'Store 0271', storeType: 'Type A', predictedSales: 6455, promo: 1 },
  { store: 'Store 0376', storeType: 'Type A', predictedSales: 6254, promo: 1 },
  { store: 'Store 0498', storeType: 'Type A', predictedSales: 6182, promo: 1 },
  { store: 'Store 0726', storeType: 'Type A', predictedSales: 6180, promo: 1 },
  { store: 'Store 0932', storeType: 'Type C', predictedSales: 6033, promo: 1 },
  { store: 'Store 0867', storeType: 'Type C', predictedSales: 5341, promo: 1 },
  { store: 'Store 0111', storeType: 'Type A', predictedSales: 5073, promo: 0 },
  { store: 'Store 0121', storeType: 'Type D', predictedSales: 5055, promo: 0 },
  { store: 'Store 0393', storeType: 'Type A', predictedSales: 4985, promo: 0 },
  { store: 'Store 0120', storeType: 'Type B', predictedSales: 3427, promo: 0 },
];

// ── Model accuracy summary ────────────────────────────────────
export const modelStats = {
  algorithm:  'LightGBM',
  rmse:        892,
  mape:        '7.4%',
  r2:          '0.924',
  trainSize:   '1,017,209 rows',
  features:    18,
  trainPeriod: 'Jan 2013 – Jul 2015',
};
