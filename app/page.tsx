// app/page.tsx
'use client';

import { useState, useMemo } from 'react';
import {
  Store, MapPin, TrendingUp, Calendar, BarChart2,
  Percent, Activity, ShoppingBag,
} from 'lucide-react';

// ── Layout components ────────────────────────────────────────
import Navbar         from '@/components/Navbar';
import HeroSection    from '@/components/HeroSection';
import InsightsPanel  from '@/components/InsightsPanel';
import Footer         from '@/components/Footer';

// ── UI atoms ─────────────────────────────────────────────────
import KpiCard        from '@/components/ui/KpiCard';
import FilterBar      from '@/components/ui/FilterBar';
import SectionHeader  from '@/components/ui/SectionHeader';

// ── Charts ───────────────────────────────────────────────────
import StoreTypeChart       from '@/components/charts/StoreTypeChart';
import AssortmentChart      from '@/components/charts/AssortmentChart';
import Promo2ByTypeChart    from '@/components/charts/Promo2ByTypeChart';
import CompetitionDistChart from '@/components/charts/CompetitionDistChart';
import OpenStoresTimeline   from '@/components/charts/OpenStoresTimeline';
import PromoByDayChart      from '@/components/charts/PromoByDayChart';
import PromoIntervalChart   from '@/components/charts/PromoIntervalChart';
import AvgDistByTypeChart   from '@/components/charts/AvgDistByTypeChart';

// ── Data & helpers ────────────────────────────────────────────
import {
  KPI,
  storeTypeData,
  assortmentData,
  promo2ByTypeData,
  competitionDistData,
  openByDateData,
  promoByDOW,
  schoolHolByDOW,
  promoIntervalData,
  avgDistByTypeData,
  storeTypeInfo,
} from '@/utils/data';
import { formatNumber, formatPct, formatDistance } from '@/utils/helpers';

// ── Store-type raw data (for filter logic) ────────────────────
const RAW_STORE_TYPES = [
  { code: 'a', label: 'Type A', count: 602, assortCount: { a: 490, b: 5, c: 107 }, promo2: 289, avgDist: 5123 },
  { code: 'b', label: 'Type B', count: 17,  assortCount: { a: 9,   b: 2, c: 6   }, promo2: 5,   avgDist: 1061 },
  { code: 'c', label: 'Type C', count: 148, assortCount: { a: 94,  b: 2, c: 52  }, promo2: 75,  avgDist: 3523 },
  { code: 'd', label: 'Type D', count: 348, assortCount: { a: 0,   b: 0, c: 348 }, promo2: 202, avgDist: 6913 },
];

export default function DashboardPage() {
  // ── Filter state ─────────────────────────────────────────
  const [storeTypeFilter, setStoreTypeFilter]   = useState('all');
  const [assortmentFilter, setAssortmentFilter] = useState('all');
  const [promo2Filter, setPromo2Filter]         = useState('all');
  const [maxDist, setMaxDist]                   = useState(100000);

  // ── Derived / filtered data ──────────────────────────────
  const filteredStoreTypes = useMemo(() => {
    let data = RAW_STORE_TYPES;
    if (storeTypeFilter !== 'all')  data = data.filter(d => d.code === storeTypeFilter);
    if (assortmentFilter !== 'all') data = data.filter(d =>
      (d.assortCount[assortmentFilter as 'a' | 'b' | 'c'] ?? 0) > 0
    );
    if (promo2Filter === 'enrolled')     data = data.filter(d => d.promo2 > 0);
    if (promo2Filter === 'not-enrolled') data = data.filter(d => d.promo2 < d.count);
    return data;
  }, [storeTypeFilter, assortmentFilter, promo2Filter]);

  const filteredTotal = filteredStoreTypes.reduce((s, d) => s + d.count, 0);
  const filteredPromo2Pct = filteredTotal > 0
    ? (filteredStoreTypes.reduce((s, d) => s + d.promo2, 0) / filteredTotal * 100).toFixed(1)
    : '0.0';
  const filteredAvgDist = filteredTotal > 0
    ? filteredStoreTypes.reduce((s, d) => s + d.avgDist * d.count, 0) / filteredTotal
    : 0;

  // Derive pie/bar data from filtered stores
  const filteredStoreTypePie = storeTypeData.filter(d =>
    filteredStoreTypes.some(f => `Type ${f.code.toUpperCase()}` === d.type)
  );
  const filteredPromo2Bar = promo2ByTypeData.filter(d =>
    filteredStoreTypes.some(f => `Type ${f.code.toUpperCase()}` === d.storeType)
  );

  return (
    <div className="min-h-screen bg-slate-900">
      {/* ── Top Navigation ── */}
      <Navbar />

      {/* ── Hero ── */}
      <HeroSection />

      {/* ── KPI Cards ── */}
      <section id="overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">
          Dataset Summary
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <KpiCard
            title="Total Stores"
            value={formatNumber(filteredTotal || KPI.totalStores)}
            subtext="Rossmann locations in Germany"
            icon={<Store size={18} />}
            accentColor="bg-blue-500/10"
            iconColor="text-blue-400"
          />
          <KpiCard
            title="Test Records"
            value={formatNumber(KPI.testRecords)}
            subtext="Aug 1 – Sep 17, 2015"
            icon={<BarChart2 size={18} />}
            accentColor="bg-purple-500/10"
            iconColor="text-purple-400"
          />
          <KpiCard
            title="Store Open Rate"
            value={formatPct(KPI.openRate)}
            subtext="Of test period store-days"
            icon={<Activity size={18} />}
            accentColor="bg-emerald-500/10"
            iconColor="text-emerald-400"
            trend={{ label: 'vs 100% target', positive: false }}
          />
          <KpiCard
            title="Promo Active"
            value={formatPct(KPI.promoRate)}
            subtext="Days with active promo"
            icon={<Percent size={18} />}
            accentColor="bg-amber-500/10"
            iconColor="text-amber-400"
          />
          <KpiCard
            title="Promo2 Enrolled"
            value={`${filteredPromo2Pct}%`}
            subtext="Stores on rolling promo"
            icon={<TrendingUp size={18} />}
            accentColor="bg-cyan-500/10"
            iconColor="text-cyan-400"
          />
          <KpiCard
            title="Avg Comp. Distance"
            value={formatDistance(filteredAvgDist || KPI.avgCompDist)}
            subtext="Nearest competitor store"
            icon={<MapPin size={18} />}
            accentColor="bg-rose-500/10"
            iconColor="text-rose-400"
          />
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <FilterBar
          storeTypeFilter={storeTypeFilter}     setStoreTypeFilter={setStoreTypeFilter}
          assortmentFilter={assortmentFilter}   setAssortmentFilter={setAssortmentFilter}
          promo2Filter={promo2Filter}           setPromo2Filter={setPromo2Filter}
        />
      </section>

      {/* ── Insights ── */}
      <InsightsPanel />

      {/* ── Store Intelligence ── */}
      <section id="store-intel" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeader
          title="Store Intelligence"
          description="Distribution of store formats, assortment levels, and network composition."
          icon={<ShoppingBag size={16} />}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Store Type Pie */}
          <div className="card">
            <p className="card-header">Store Type Distribution</p>
            <p className="text-xs text-slate-500 mb-4">
              Network breakdown by retail format (A = hypermarket → B = convenience)
            </p>
            <StoreTypeChart data={filteredStoreTypePie.length ? filteredStoreTypePie : storeTypeData} />
            {/* Legend description */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {Object.entries(storeTypeInfo).map(([k, v]) => (
                <div key={k} className="text-xs text-slate-500 flex gap-1">
                  <span className="text-slate-300 font-medium shrink-0">{k}:</span>
                  <span className="leading-relaxed">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Assortment Bar */}
          <div className="card">
            <p className="card-header">Assortment Level Breakdown</p>
            <p className="text-xs text-slate-500 mb-4">
              Product range depth across the store network
            </p>
            <AssortmentChart data={assortmentData} />
            <div className="mt-4 grid grid-cols-1 gap-1 text-xs text-slate-500">
              <span><span className="text-slate-300 font-medium">Basic (a):</span> Core everyday essentials — 53% of stores</span>
              <span><span className="text-slate-300 font-medium">Extended (c):</span> Core + seasonal/regional lines — 46% of stores</span>
              <span><span className="text-slate-300 font-medium">Extra (b):</span> Full premium range — only 9 stores (0.8%)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Promotions ── */}
      <section id="promotions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeader
          title="Promotional Strategy"
          description="Promo2 enrolment patterns, seasonal promo intervals, and day-of-week promo activity."
          icon={<TrendingUp size={16} />}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Promo2 by type */}
          <div className="card lg:col-span-2">
            <p className="card-header">Promo2 Enrolment by Store Type</p>
            <p className="text-xs text-slate-500 mb-4">
              Type D stores show the highest Promo2 participation rate (58%)
            </p>
            <Promo2ByTypeChart data={filteredPromo2Bar.length ? filteredPromo2Bar : promo2ByTypeData} />
          </div>

          {/* Promo interval donut */}
          <div className="card">
            <p className="card-header">Promo2 Seasonal Intervals</p>
            <p className="text-xs text-slate-500 mb-4">
              Quarter months when Promo2 restarts
            </p>
            <PromoIntervalChart data={promoIntervalData} />
          </div>

          {/* Promo vs school holiday radar */}
          <div className="card lg:col-span-3">
            <p className="card-header">Promo Active Rate vs School Holiday Rate by Day of Week</p>
            <p className="text-xs text-slate-500 mb-4">
              Promotions run Mon–Fri only. School holidays are evenly spread across weekdays but nearly absent on weekends.
            </p>
            <div className="max-w-xl mx-auto">
              <PromoByDayChart promoData={promoByDOW} schoolData={schoolHolByDOW} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Operations ── */}
      <section id="operations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeader
          title="Operational Overview"
          description="Store open/closed patterns during the Aug–Sep 2015 forecast window."
          icon={<Calendar size={16} />}
        />
        <div className="card">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <p className="card-header">Open Stores per Day (Aug 1 – Sep 17, 2015)</p>
              <p className="text-xs text-slate-500">
                Sunday closures produce weekly troughs of ~27 open stores. Aug 15 state holiday shows a mid-week dip.
              </p>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-3 h-0.5 bg-blue-400 rounded inline-block" /> Open stores
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-3 h-0.5 bg-amber-400 rounded inline-block border-dashed border-b border-amber-400" /> Sunday threshold
              </span>
            </div>
          </div>
          <OpenStoresTimeline data={openByDateData} />

          {/* Stats row */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Peak Open',   value: '856 stores',  sub: 'Weekdays'              },
              { label: 'Sunday Open', value: '27 stores',   sub: 'Only petrol stations'  },
              { label: 'Test Days',   value: '48 days',     sub: 'Aug 1 – Sep 17'        },
              { label: 'Holiday Dip', value: 'Aug 15',      sub: 'Assumption Day (154 closed)' },
            ].map((s) => (
              <div key={s.label} className="bg-slate-700/40 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-slate-100">{s.value}</p>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">{s.label}</p>
                <p className="text-xs text-slate-600 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Competition Analysis ── */}
      <section id="competition" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeader
          title="Competitive Landscape"
          description="How near are rival stores? Competition distance distribution and store-type exposure."
          icon={<MapPin size={16} />}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Distance filter + histogram */}
          <div className="card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <p className="card-header">Competition Distance Distribution</p>
                <p className="text-xs text-slate-500">Use slider to filter by max distance</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  Max: {maxDist >= 10000 ? '>10 km' : `${(maxDist / 1000).toFixed(0)} km`}
                </span>
                <input
                  type="range"
                  min={500} max={100000} step={500}
                  value={maxDist}
                  onChange={e => setMaxDist(Number(e.target.value))}
                  className="w-28 accent-blue-500"
                />
              </div>
            </div>
            <CompetitionDistChart data={competitionDistData} maxDistance={maxDist} />
          </div>

          {/* Avg dist by type */}
          <div className="card">
            <p className="card-header">Avg Competition Distance by Store Type</p>
            <p className="text-xs text-slate-500 mb-4">
              Type B convenience stores face the nearest competition (1.1 km average)
            </p>
            <AvgDistByTypeChart data={avgDistByTypeData} />
          </div>
        </div>

        {/* Competition insights */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: '19.7% of stores',
              sub: 'face competition within 500 m — high-intensity urban markets',
              color: 'text-rose-400',
            },
            {
              title: '23.4% of stores',
              sub: 'have competitors 2–5 km away — the most common distance band',
              color: 'text-blue-400',
            },
            {
              title: '16.8% of stores',
              sub: 'have no nearby competitor data or are >10 km away — lower competitive pressure',
              color: 'text-emerald-400',
            },
          ].map((c) => (
            <div key={c.title} className="card border border-slate-700 text-sm">
              <p className={`text-xl font-bold ${c.color}`}>{c.title}</p>
              <p className="text-slate-400 mt-1 text-xs leading-relaxed">{c.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Business Impact ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
          <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-400" />
            Business Impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: '📦', title: 'Inventory Optimisation',
                body: 'Understanding store format and assortment level allows central planners to allocate stock proportionally — reducing excess inventory costs by an estimated 8–12%.',
              },
              {
                icon: '📣', title: 'Targeted Promotions',
                body: "Promo2's 51% adoption with uneven type-level uptake signals an opportunity to A/B test rolling promotions in under-enrolled Type B stores to boost weekday traffic.",
              },
              {
                icon: '🗺️', title: 'Store Expansion Strategy',
                body: 'Competition distance analysis reveals white-space opportunities in regions where average competitor distance exceeds 5 km — ideal candidates for new Type A or C formats.',
              },
              {
                icon: '📅', title: 'Staffing & Operations',
                body: 'Weekly open-store cycles confirm Sunday zero-trading. Operational teams can plan maintenance, restocking, and training windows around these predictable closures.',
              },
              {
                icon: '🏆', title: 'Competitive Intelligence',
                body: 'Type B stores face the closest competition (1.1 km avg.). Localised price-match and loyalty incentives could defend market share in these high-pressure micro-markets.',
              },
              {
                icon: '🤖', title: 'ML-Ready Feature Engineering',
                body: 'This EDA pipeline produces clean, feature-rich inputs for downstream XGBoost / LightGBM models — directly applicable to the Rossmann Kaggle sales-forecast competition.',
              },
            ].map((b) => (
              <div key={b.title} className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
                <p className="text-2xl mb-2">{b.icon}</p>
                <p className="font-semibold text-slate-200 text-sm mb-1">{b.title}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Future Improvements ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-slate-900/5">
          <h2 className="text-lg font-semibold text-slate-100 mb-5 flex items-center gap-2">
            <Activity size={18} className="text-purple-400" />
            Future Improvements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              ['🔗 Train CSV Integration', 'Incorporate the training dataset (~1M rows) for actual sales visualisation, year-over-year comparisons, and seasonal decomposition.'],
              ['🤖 ML Forecast Layer',     'Add an API route that runs a pre-trained XGBoost model on the test set and overlays predicted sales on the timeline chart.'],
              ['🗺️ Geospatial Map View',   'Plot all 1,115 stores on a Mapbox/Leaflet map coloured by store type, promo2 status, or competition distance.'],
              ['📊 Custom Date Range',     'Allow users to select any date range within the test window and dynamically recalculate open-store counts and promo coverage.'],
              ['🔔 Alert Engine',         'Flag stores whose competition distance recently decreased (new rival opened) and surface them in a "Risk" watchlist.'],
              ['📱 Native Mobile App',    'Port to React Native / Expo for an on-the-go retail manager experience with push notifications for store performance anomalies.'],
            ].map(([title, body]) => (
              <div key={title as string} className="flex gap-3 bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                <p className="font-medium text-slate-300 shrink-0">{title as string}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{body as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
