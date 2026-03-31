// app/page.tsx — Add MapSection import and usage
// Find the line:   import ForecastSection from '@/components/ForecastSection';
// Add below it:    import MapSection from '@/components/MapSection';
//
// Find the line:   <ForecastSection />
// Add below it:    <MapSection />
//
// ── The complete updated page.tsx is below ──────────────────────

'use client';

import { useState, useMemo } from 'react';
import {
  Store, MapPin, TrendingUp, Calendar, BarChart2,
  Percent, Activity, ShoppingBag,
} from 'lucide-react';

import Navbar          from '@/components/Navbar';
import HeroSection     from '@/components/HeroSection';
import InsightsPanel   from '@/components/InsightsPanel';
import Footer          from '@/components/Footer';
import ForecastSection from '@/components/ForecastSection';
import MapSection      from '@/components/MapSection';        // ← NEW

import KpiCard         from '@/components/ui/KpiCard';
import FilterBar       from '@/components/ui/FilterBar';
import SectionHeader   from '@/components/ui/SectionHeader';

import StoreTypeChart       from '@/components/charts/StoreTypeChart';
import AssortmentChart      from '@/components/charts/AssortmentChart';
import Promo2ByTypeChart    from '@/components/charts/Promo2ByTypeChart';
import CompetitionDistChart from '@/components/charts/CompetitionDistChart';
import OpenStoresTimeline   from '@/components/charts/OpenStoresTimeline';
import PromoByDayChart      from '@/components/charts/PromoByDayChart';
import PromoIntervalChart   from '@/components/charts/PromoIntervalChart';
import AvgDistByTypeChart   from '@/components/charts/AvgDistByTypeChart';

import {
  KPI, storeTypeData, assortmentData, promo2ByTypeData,
  competitionDistData, openByDateData, promoByDOW,
  schoolHolByDOW, promoIntervalData, avgDistByTypeData, storeTypeInfo,
} from '@/utils/data';
import { formatNumber, formatPct, formatDistance } from '@/utils/helpers';

const RAW_STORE_TYPES = [
  { code: 'a', label: 'Type A', count: 602, assortCount: { a: 490, b: 5, c: 107 }, promo2: 289, avgDist: 5123 },
  { code: 'b', label: 'Type B', count: 17,  assortCount: { a: 9,   b: 2, c: 6   }, promo2: 5,   avgDist: 1061 },
  { code: 'c', label: 'Type C', count: 148, assortCount: { a: 94,  b: 2, c: 52  }, promo2: 75,  avgDist: 3523 },
  { code: 'd', label: 'Type D', count: 348, assortCount: { a: 0,   b: 0, c: 348 }, promo2: 202, avgDist: 6913 },
];

export default function DashboardPage() {
  const [storeTypeFilter, setStoreTypeFilter]   = useState('all');
  const [assortmentFilter, setAssortmentFilter] = useState('all');
  const [promo2Filter, setPromo2Filter]         = useState('all');
  const [maxDist, setMaxDist]                   = useState(100000);

  const filteredStoreTypes = useMemo(() => {
    let data = RAW_STORE_TYPES;
    if (storeTypeFilter !== 'all')  data = data.filter(d => d.code === storeTypeFilter);
    if (assortmentFilter !== 'all') data = data.filter(d =>
      (d.assortCount[assortmentFilter as 'a'|'b'|'c'] ?? 0) > 0
    );
    if (promo2Filter === 'enrolled')     data = data.filter(d => d.promo2 > 0);
    if (promo2Filter === 'not-enrolled') data = data.filter(d => d.promo2 < d.count);
    return data;
  }, [storeTypeFilter, assortmentFilter, promo2Filter]);

  const filteredTotal     = filteredStoreTypes.reduce((s, d) => s + d.count, 0);
  const filteredPromo2Pct = filteredTotal > 0
    ? (filteredStoreTypes.reduce((s, d) => s + d.promo2, 0) / filteredTotal * 100).toFixed(1)
    : '0.0';
  const filteredAvgDist   = filteredTotal > 0
    ? filteredStoreTypes.reduce((s, d) => s + d.avgDist * d.count, 0) / filteredTotal
    : 0;

  const filteredStoreTypePie = storeTypeData.filter(d =>
    filteredStoreTypes.some(f => `Type ${f.code.toUpperCase()}` === d.type)
  );
  const filteredPromo2Bar = promo2ByTypeData.filter(d =>
    filteredStoreTypes.some(f => `Type ${f.code.toUpperCase()}` === d.storeType)
  );

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <HeroSection />

      {/* KPI Cards */}
      <section id="overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">Dataset Summary</p>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <KpiCard title="Total Stores"       value={formatNumber(filteredTotal || KPI.totalStores)} subtext="Rossmann locations in Germany"   icon={<Store size={18} />}     accentColor="bg-blue-500/10"    iconColor="text-blue-400" />
          <KpiCard title="Test Records"       value={formatNumber(KPI.testRecords)}                  subtext="Aug 1 – Sep 17, 2015"            icon={<BarChart2 size={18} />}  accentColor="bg-purple-500/10"  iconColor="text-purple-400" />
          <KpiCard title="Store Open Rate"    value={formatPct(KPI.openRate)}                        subtext="Of test period store-days"       icon={<Activity size={18} />}   accentColor="bg-emerald-500/10" iconColor="text-emerald-400" trend={{ label: 'vs 100% target', positive: false }} />
          <KpiCard title="Promo Active"       value={formatPct(KPI.promoRate)}                       subtext="Days with active promo"          icon={<Percent size={18} />}    accentColor="bg-amber-500/10"   iconColor="text-amber-400" />
          <KpiCard title="Promo2 Enrolled"    value={`${filteredPromo2Pct}%`}                        subtext="Stores on rolling promo"         icon={<TrendingUp size={18} />} accentColor="bg-cyan-500/10"    iconColor="text-cyan-400" />
          <KpiCard title="Avg Comp. Distance" value={formatDistance(filteredAvgDist || KPI.avgCompDist)} subtext="Nearest competitor store"  icon={<MapPin size={18} />}    accentColor="bg-rose-500/10"    iconColor="text-rose-400" />
        </div>
      </section>

      {/* Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <FilterBar
          storeTypeFilter={storeTypeFilter}   setStoreTypeFilter={setStoreTypeFilter}
          assortmentFilter={assortmentFilter} setAssortmentFilter={setAssortmentFilter}
          promo2Filter={promo2Filter}         setPromo2Filter={setPromo2Filter}
        />
      </section>

      <InsightsPanel />

      {/* Store Intelligence */}
      <section id="store-intel" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeader title="Store Intelligence" description="Distribution of store formats, assortment levels, and network composition." icon={<ShoppingBag size={16} />} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <p className="card-header">Store Type Distribution</p>
            <p className="text-xs text-slate-500 mb-4">Network breakdown by retail format</p>
            <StoreTypeChart data={filteredStoreTypePie.length ? filteredStoreTypePie : storeTypeData} />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {Object.entries(storeTypeInfo).map(([k, v]) => (
                <div key={k} className="text-xs text-slate-500 flex gap-1">
                  <span className="text-slate-300 font-medium shrink-0">{k}:</span>
                  <span className="leading-relaxed">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <p className="card-header">Assortment Level Breakdown</p>
            <p className="text-xs text-slate-500 mb-4">Product range depth across the store network</p>
            <AssortmentChart data={assortmentData} />
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section id="promotions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeader title="Promotional Strategy" description="Promo2 enrolment patterns, seasonal promo intervals, and day-of-week promo activity." icon={<TrendingUp size={16} />} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card lg:col-span-2">
            <p className="card-header">Promo2 Enrolment by Store Type</p>
            <p className="text-xs text-slate-500 mb-4">Type D stores show the highest Promo2 participation (58%)</p>
            <Promo2ByTypeChart data={filteredPromo2Bar.length ? filteredPromo2Bar : promo2ByTypeData} />
          </div>
          <div className="card">
            <p className="card-header">Promo2 Seasonal Intervals</p>
            <p className="text-xs text-slate-500 mb-4">Quarter months when Promo2 restarts</p>
            <PromoIntervalChart data={promoIntervalData} />
          </div>
          <div className="card lg:col-span-3">
            <p className="card-header">Promo Active Rate vs School Holiday Rate by Day of Week</p>
            <p className="text-xs text-slate-500 mb-4">Promotions run Mon–Fri only.</p>
            <div className="max-w-xl mx-auto">
              <PromoByDayChart promoData={promoByDOW} schoolData={schoolHolByDOW} />
            </div>
          </div>
        </div>
      </section>

      {/* Operations */}
      <section id="operations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeader title="Operational Overview" description="Store open/closed patterns during the Aug–Sep 2015 forecast window." icon={<Calendar size={16} />} />
        <div className="card">
          <p className="card-header">Open Stores per Day (Aug 1 – Sep 17, 2015)</p>
          <p className="text-xs text-slate-500 mb-4">Sunday closures produce weekly troughs of ~27 open stores.</p>
          <OpenStoresTimeline data={openByDateData} />
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label:'Peak Open',   value:'856 stores', sub:'Weekdays'         },
              { label:'Sunday Open', value:'27 stores',  sub:'Only petrol stations' },
              { label:'Test Days',   value:'48 days',    sub:'Aug 1 – Sep 17'   },
              { label:'Holiday Dip', value:'Aug 15',     sub:'154 stores closed'},
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

      {/* Competition */}
      <section id="competition" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeader title="Competitive Landscape" description="How near are rival stores?" icon={<MapPin size={16} />} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <p className="card-header">Competition Distance Distribution</p>
                <p className="text-xs text-slate-500">Use slider to filter by max distance</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  Max: {maxDist >= 10000 ? '>10 km' : `${(maxDist/1000).toFixed(0)} km`}
                </span>
                <input type="range" min={500} max={100000} step={500} value={maxDist}
                  onChange={e => setMaxDist(Number(e.target.value))} className="w-28 accent-blue-500" />
              </div>
            </div>
            <CompetitionDistChart data={competitionDistData} maxDistance={maxDist} />
          </div>
          <div className="card">
            <p className="card-header">Avg Competition Distance by Store Type</p>
            <p className="text-xs text-slate-500 mb-4">Type B convenience stores face the nearest competition (1.1 km)</p>
            <AvgDistByTypeChart data={avgDistByTypeData} />
          </div>
        </div>
      </section>

      {/* AI Forecast */}
      <div className="border-t border-slate-700/50 mt-4">
        <ForecastSection />
      </div>

      {/* 🗺️ Store Map (NEW) */}
      <div className="border-t border-slate-700/50 mt-4">
        <MapSection />
      </div>

      <Footer />
    </div>
  );
}
