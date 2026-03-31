// components/ForecastSection.tsx
'use client';

import { useState } from 'react';
import { Brain, TrendingUp, Calendar, Zap, Store, Info } from 'lucide-react';

import ForecastTimelineChart  from '@/components/charts/ForecastTimelineChart';
import StoreTypeForecastChart from '@/components/charts/StoreTypeForecastChart';
import WeeklyHeatmapChart     from '@/components/charts/WeeklyHeatmapChart';
import PromoImpactChart       from '@/components/charts/PromoImpactChart';
import StorePredictionChart   from '@/components/charts/StorePredictionChart';

import {
  timelineData,
  storeTypeForecastData,
  heatmapData,
  promoImpactData,
  storePredictionsData,
  modelStats,
} from '@/utils/forecastData';

export default function ForecastSection() {
  const [showPromo, setShowPromo] = useState(true);

  return (
    <section id="forecast" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* ── Section Header ── */}
      <div className="flex items-start gap-3 mb-6">
        <div className="mt-0.5 p-2 bg-purple-500/10 rounded-lg text-purple-400">
          <Brain size={18} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-100">
            AI Sales Forecast
            <span className="ml-2 badge bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs align-middle">
              LightGBM
            </span>
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Machine learning predictions for Aug–Sep 2015 · Trained on 1M+ historical records
          </p>
        </div>
      </div>

      {/* ── Model Stats Banner ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {[
          { label: 'Algorithm',     value: modelStats.algorithm,    icon: <Brain size={13} />,    color: 'text-purple-400' },
          { label: 'R² Score',      value: modelStats.r2,           icon: <TrendingUp size={13} />, color: 'text-emerald-400' },
          { label: 'MAPE',          value: modelStats.mape,         icon: <Zap size={13} />,       color: 'text-amber-400' },
          { label: 'RMSE',          value: `€${modelStats.rmse}`,   icon: <Info size={13} />,      color: 'text-blue-400' },
          { label: 'Features',      value: `${modelStats.features}`, icon: <Store size={13} />,    color: 'text-cyan-400' },
          { label: 'Training Rows', value: modelStats.trainSize,    icon: <Calendar size={13} />, color: 'text-rose-400' },
        ].map((s) => (
          <div key={s.label} className="card text-center py-3">
            <p className={`flex items-center justify-center gap-1 text-xs font-medium mb-1 ${s.color}`}>
              {s.icon} {s.label}
            </p>
            <p className="text-base font-bold text-slate-100">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── Chart 1: Daily Sales Forecast Timeline ── */}
      <div className="card mb-6">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <p className="card-header flex items-center gap-2">
              <TrendingUp size={14} className="text-emerald-400" />
              Chart 1 — Daily Sales Forecast Timeline
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Network-wide actual vs predicted sales · Aug 1 – Sep 17, 2015
            </p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs text-slate-400">Show Promo Overlay</span>
            <div
              onClick={() => setShowPromo(!showPromo)}
              className={`w-10 h-5 rounded-full transition-colors duration-200 relative cursor-pointer
                ${showPromo ? 'bg-amber-500' : 'bg-slate-600'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform duration-200
                ${showPromo ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
          </label>
        </div>
        <ForecastTimelineChart data={timelineData} showPromo={showPromo} />
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-emerald-400 inline-block rounded" /> Actual Network Sales</span>
          <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-blue-400 inline-block rounded border-dashed border-b-2" /> Predicted (LightGBM)</span>
          {showPromo && <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-amber-500/20 inline-block rounded" /> Promo Days</span>}
        </div>
      </div>

      {/* ── Charts 2 & 4 side by side ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Chart 2: Store Type Forecast */}
        <div className="card">
          <p className="card-header flex items-center gap-2">
            <Store size={14} className="text-blue-400" />
            Chart 2 — Sales Forecast by Store Type
          </p>
          <p className="text-xs text-slate-500 mb-4">
            Predicted daily avg sales per store · Promo OFF vs ON vs Forecast
          </p>
          <StoreTypeForecastChart data={storeTypeForecastData} />
        </div>

        {/* Chart 4: Promo Impact */}
        <div className="card">
          <p className="card-header flex items-center gap-2">
            <Zap size={14} className="text-amber-400" />
            Chart 4 — Promo Impact Forecast
          </p>
          <p className="text-xs text-slate-500 mb-4">
            Revenue lift from running promotions · % uplift by store type
          </p>
          <PromoImpactChart data={promoImpactData} />
        </div>
      </div>

      {/* ── Chart 3: Weekly Heatmap ── */}
      <div className="card mb-6">
        <p className="card-header flex items-center gap-2">
          <Calendar size={14} className="text-cyan-400" />
          Chart 3 — Weekly Sales Heatmap
        </p>
        <p className="text-xs text-slate-500 mb-5">
          Predicted avg daily sales per store by week and day of week · Darker = higher sales · 🔒 = Sunday (closed)
        </p>
        <WeeklyHeatmapChart data={heatmapData} />
      </div>

      {/* ── Chart 5: Store-Level Predictions ── */}
      <div className="card">
        <p className="card-header flex items-center gap-2">
          <Store size={14} className="text-purple-400" />
          Chart 5 — Sales Prediction by Individual Store
        </p>
        <p className="text-xs text-slate-500 mb-2">
          Top 20 stores by predicted daily sales · Filter by type, promo status, or search by store ID
        </p>
        <StorePredictionChart data={storePredictionsData} />
      </div>

      {/* ── Python API instructions ── */}
      <div className="mt-6 card border border-blue-500/20 bg-blue-500/5">
        <div className="flex items-start gap-3">
          <Brain size={18} className="text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-slate-200 mb-1">
              🐍 Connect to Live Python API (Optional Upgrade)
            </p>
            <p className="text-xs text-slate-400 mb-3">
              The charts above use pre-computed predictions. To connect a live LightGBM model trained on your real{' '}
              <code className="bg-slate-700 px-1 rounded text-blue-300">train.csv</code>, deploy the included Python FastAPI
              backend to Railway and set your environment variable:
            </p>
            <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-emerald-400 border border-slate-700">
              <p className="text-slate-500 mb-1"># In Vercel dashboard → Environment Variables → Add:</p>
              <p>NEXT_PUBLIC_API_URL=https://your-railway-app.railway.app</p>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              See <code className="text-blue-300">api/README.md</code> for full deployment steps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
