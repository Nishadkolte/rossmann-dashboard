// ============================================================
// utils/data.ts
// Static data extracted from Rossmann store & test CSV files.
// All transformations were done in Python (pandas) at build time.
// ============================================================

// ── KPI Summary ──────────────────────────────────────────────
export const KPI = {
  totalStores: 1115,
  avgCompDist: 5404.9,       // meters
  promo2Pct: 51.2,           // % of stores enrolled in Promo2
  testRecords: 41088,
  openRate: 85.4,            // % of test rows where store is Open
  promoRate: 39.6,           // % of test rows with active Promo
};

// ── Store Type Distribution ───────────────────────────────────
export const storeTypeData = [
  { type: 'Type A', count: 602, fill: '#3b82f6' },
  { type: 'Type D', count: 348, fill: '#8b5cf6' },
  { type: 'Type C', count: 148, fill: '#06b6d4' },
  { type: 'Type B', count: 17,  fill: '#f59e0b' },
];

// ── Assortment Level Distribution ────────────────────────────
export const assortmentData = [
  { type: 'Basic (a)',    count: 593, fill: '#10b981' },
  { type: 'Extended (c)', count: 513, fill: '#3b82f6' },
  { type: 'Extra (b)',    count: 9,   fill: '#f59e0b' },
];

// ── Promo2 Participation by Store Type ────────────────────────
export const promo2ByTypeData = [
  { storeType: 'Type A', enrolled: 289, notEnrolled: 313 },
  { storeType: 'Type B', enrolled: 5,   notEnrolled: 12  },
  { storeType: 'Type C', enrolled: 75,  notEnrolled: 73  },
  { storeType: 'Type D', enrolled: 202, notEnrolled: 146 },
];

// ── Competition Distance Distribution (buckets) ───────────────
export const competitionDistData = [
  { range: '<500m',    count: 220 },
  { range: '500m–1km', count: 110 },
  { range: '1–2km',    count: 172 },
  { range: '2–5km',    count: 261 },
  { range: '5–10km',   count: 162 },
  { range: '>10km',    count: 187 },
];

// ── Avg Competition Distance by Store Type ────────────────────
export const avgDistByTypeData = [
  { type: 'Type A', avgDistance: 5123 },
  { type: 'Type B', avgDistance: 1061 },
  { type: 'Type C', avgDistance: 3523 },
  { type: 'Type D', avgDistance: 6913 },
];

// ── Open Stores Per Day (Aug–Sep 2015) ────────────────────────
export const openByDateData = [
  { date: '08/01', openStores: 856 },
  { date: '08/02', openStores: 27  },
  { date: '08/03', openStores: 856 },
  { date: '08/04', openStores: 856 },
  { date: '08/05', openStores: 856 },
  { date: '08/06', openStores: 856 },
  { date: '08/07', openStores: 856 },
  { date: '08/08', openStores: 848 },
  { date: '08/09', openStores: 27  },
  { date: '08/10', openStores: 856 },
  { date: '08/11', openStores: 856 },
  { date: '08/12', openStores: 856 },
  { date: '08/13', openStores: 856 },
  { date: '08/14', openStores: 856 },
  { date: '08/15', openStores: 702 },
  { date: '08/16', openStores: 27  },
  { date: '08/17', openStores: 856 },
  { date: '08/18', openStores: 856 },
  { date: '08/19', openStores: 856 },
  { date: '08/20', openStores: 856 },
  { date: '08/21', openStores: 856 },
  { date: '08/22', openStores: 856 },
  { date: '08/23', openStores: 27  },
  { date: '08/24', openStores: 856 },
  { date: '08/25', openStores: 856 },
  { date: '08/26', openStores: 856 },
  { date: '08/27', openStores: 856 },
  { date: '08/28', openStores: 856 },
  { date: '08/29', openStores: 855 },
  { date: '08/30', openStores: 27  },
  { date: '08/31', openStores: 856 },
  { date: '09/01', openStores: 856 },
  { date: '09/02', openStores: 856 },
  { date: '09/03', openStores: 856 },
  { date: '09/04', openStores: 856 },
  { date: '09/05', openStores: 855 },
  { date: '09/06', openStores: 27  },
  { date: '09/07', openStores: 854 },
  { date: '09/08', openStores: 854 },
  { date: '09/09', openStores: 854 },
  { date: '09/10', openStores: 855 },
  { date: '09/11', openStores: 854 },
  { date: '09/12', openStores: 853 },
  { date: '09/13', openStores: 27  },
  { date: '09/14', openStores: 852 },
  { date: '09/15', openStores: 852 },
  { date: '09/16', openStores: 852 },
  { date: '09/17', openStores: 852 },
];

// ── Promo Rate by Day of Week ─────────────────────────────────
export const promoByDOW = [
  { dayName: 'Mon', promoRate: 57.1 },
  { dayName: 'Tue', promoRate: 57.1 },
  { dayName: 'Wed', promoRate: 57.1 },
  { dayName: 'Thu', promoRate: 57.1 },
  { dayName: 'Fri', promoRate: 50.0 },
  { dayName: 'Sat', promoRate: 0.0  },
  { dayName: 'Sun', promoRate: 0.0  },
];

// ── School Holiday Rate by Day of Week ───────────────────────
export const schoolHolByDOW = [
  { dayName: 'Mon', rate: 61.9 },
  { dayName: 'Tue', rate: 58.9 },
  { dayName: 'Wed', rate: 54.2 },
  { dayName: 'Thu', rate: 53.3 },
  { dayName: 'Fri', rate: 62.2 },
  { dayName: 'Sat', rate: 11.2 },
  { dayName: 'Sun', rate: 11.2 },
];

// ── Promo2 Interval Distribution ─────────────────────────────
export const promoIntervalData = [
  { interval: 'None',             count: 544, fill: '#94a3b8' },
  { interval: 'Jan/Apr/Jul/Oct',  count: 335, fill: '#3b82f6' },
  { interval: 'Feb/May/Aug/Nov',  count: 130, fill: '#8b5cf6' },
  { interval: 'Mar/Jun/Sep/Dec',  count: 106, fill: '#06b6d4' },
];

// ── Store Type Descriptions (for tooltips / legend) ───────────
export const storeTypeInfo: Record<string, string> = {
  'Type A': 'Largest format — hypermarket with full grocery & non-food range',
  'Type B': 'Smallest footprint — convenience / petrol station forecourt format',
  'Type C': 'Mid-size — drug & health-focused supermarket',
  'Type D': 'Large-format department-store variant',
};

// ── Assortment Descriptions ────────────────────────────────────
export const assortmentInfo: Record<string, string> = {
  'Basic (a)':    'Core product range only',
  'Extended (c)': 'Core range + seasonal / regional extensions',
  'Extra (b)':    'Full range including premium & specialist lines',
};
