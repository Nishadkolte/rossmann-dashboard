// components/ModelComparisonSection.tsx
// ── Now reacts to storeTypeFilter from the global filter bar ──
'use client';

import { useState, useMemo } from 'react';
import { FlaskConical, Trophy, TrendingDown, Zap, Info, Filter } from 'lucide-react';

import ModelLeaderboard      from '@/components/charts/ModelLeaderboard';
import TuningComparisonChart from '@/components/charts/TuningComparisonChart';
import ModelTimelineChart    from '@/components/charts/ModelTimelineChart';
import ModelRadarChart       from '@/components/charts/ModelRadarChart';

import {
  MODEL_METRICS_BY_TYPE,
  PROMO_IMPACT_BY_TYPE,
  STORE_TYPE_FORECAST_BY_FILTER,
  TYPE_SALES_SHARE,
  timelineCompareData,
  radarData,
  modelDescriptions,
} from '@/utils/modelComparisonData';

type Metric = 'RMSE' | 'MAPE' | 'R2';

// ── Store type labels ─────────────────────────────────────────
const TYPE_LABELS: Record<string, string> = {
  all: 'All Store Types',
  a:   'Type A — Hypermarket',
  b:   'Type B — Convenience',
  c:   'Type C — Drug/Health',
  d:   'Type D — Department',
};

const TYPE_COLORS: Record<string, string> = {
  all: '#3b82f6',
  a:   '#8b5cf6',
  b:   '#f59e0b',
  c:   '#06b6d4',
  d:   '#10b981',
};

interface Props {
  storeTypeFilter: string; // 'all' | 'a' | 'b' | 'c' | 'd'
}

export default function ModelComparisonSection({ storeTypeFilter }: Props) {
  const [tuningMetric,   setTuningMetric]   = useState<Metric>('RMSE');
  const [expandedModel,  setExpandedModel]  = useState<string | null>(null);

  // ── Derive filtered data ──────────────────────────────────
  const activeType = storeTypeFilter === 'all' ? 'all' : storeTypeFilter;

  const filteredMetrics = useMemo(() =>
    MODEL_METRICS_BY_TYPE[activeType] ?? MODEL_METRICS_BY_TYPE.all,
    [activeType]
  );

  // Scale timeline by store type share
  const share = TYPE_SALES_SHARE[activeType] ?? 1;
  const filteredTimeline = useMemo(() =>
    timelineCompareData.map(row => ({
      ...row,
      actual:    Math.round(row.actual    * share),
      LightGBM:  Math.round(row.LightGBM  * share),
      XGBoost:   Math.round(row.XGBoost   * share),
      Prophet:   Math.round(row.Prophet   * share),
      SARIMA:    Math.round(row.SARIMA    * share),
    })),
    [share]
  );

  const winner      = filteredMetrics.find(m => m.winner);
  const typeLabel   = TYPE_LABELS[activeType] ?? 'All Store Types';
  const typeColor   = TYPE_COLORS[activeType] ?? '#3b82f6';
  const isFiltered  = activeType !== 'all';

  return (
    <section id="models" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* ── Header ── */}
      <div className="flex items-start gap-3 mb-6">
        <div className="mt-0.5 p-2 bg-amber-500/10 rounded-lg text-amber-400">
          <FlaskConical size={18} />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2 flex-wrap">
            Advanced Model Comparison
            <span className="badge bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs">
              4 Models · Tuned
            </span>
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            LightGBM · XGBoost · Prophet · SARIMA — benchmarked head-to-head
          </p>
        </div>
      </div>

      {/* ── Active Filter Banner ── */}
      {isFiltered && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl border mb-6 animate-fade-in"
          style={{ borderColor: typeColor + '40', background: typeColor + '10' }}
        >
          <Filter size={14} style={{ color: typeColor }} className="shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-200">
              Filtered: <span style={{ color: typeColor }}>{typeLabel}</span>
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              All 4 model metrics below are specific to {typeLabel} stores only.
              Change the Store Type filter above to compare different segments.
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-slate-500">Network share</p>
            <p className="text-sm font-bold" style={{ color: typeColor }}>
              {Math.round(share * 100)}%
            </p>
          </div>
        </div>
      )}

      {/* ── Winner Banner ── */}
      {winner && (
        <div className="card border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-blue-500/5 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-4xl">🏆</div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-0.5">
                Winning Model {isFiltered ? `— ${typeLabel}` : ''}
              </p>
              <p className="text-2xl font-extrabold text-white">{winner.model}</p>
              <p className="text-sm text-slate-400">Lowest RMSE after hyperparameter tuning</p>
            </div>
            <div className="flex gap-6 ml-auto">
              {[
                { label:'RMSE', value:`€${winner.afterRMSE}`,         color:'text-purple-400' },
                { label:'MAPE', value:`${winner.afterMAPE}%`,         color:'text-blue-400'   },
                { label:'R²',   value:winner.afterR2.toFixed(3),       color:'text-emerald-400'},
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Leaderboard ── */}
      <div className="card mb-6">
        <p className="card-header flex items-center gap-2">
          <Trophy size={14} className="text-amber-400" />
          Model Leaderboard
          {isFiltered && (
            <span className="ml-1 badge text-xs px-2 py-0.5"
              style={{ background: typeColor + '20', color: typeColor, border: `1px solid ${typeColor}40` }}>
              {typeLabel}
            </span>
          )}
        </p>
        <p className="text-xs text-slate-500 mb-5">
          Strikethrough = pre-tuning baseline · All metrics on Aug–Sep 2015 test set
          {isFiltered ? ` · ${typeLabel} stores only` : ''}
        </p>
        <ModelLeaderboard data={filteredMetrics} />
      </div>

      {/* ── Tuning Impact ── */}
      <div className="card mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <p className="card-header flex items-center gap-2">
              <Zap size={14} className="text-blue-400" />
              Hyperparameter Tuning Impact
              {isFiltered && (
                <span className="badge text-xs px-2 py-0.5"
                  style={{ background: typeColor + '20', color: typeColor }}>
                  {typeLabel}
                </span>
              )}
            </p>
            <p className="text-xs text-slate-500">Before vs after tuning — all 4 models</p>
          </div>
          <div className="flex rounded-lg overflow-hidden border border-slate-600">
            {(['RMSE','MAPE','R2'] as Metric[]).map(m => (
              <button key={m} onClick={() => setTuningMetric(m)}
                className={`px-4 py-1.5 text-xs font-semibold transition-colors duration-150
                  ${tuningMetric === m ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400 hover:text-white'}`}>
                {m}
              </button>
            ))}
          </div>
        </div>
        <TuningComparisonChart data={filteredMetrics} metric={tuningMetric} />
      </div>

      {/* ── Timeline ── */}
      <div className="card mb-6">
        <p className="card-header flex items-center gap-2">
          <TrendingDown size={14} className="text-emerald-400" />
          All 4 Models vs Actual Sales
          {isFiltered && (
            <span className="badge text-xs px-2 py-0.5"
              style={{ background: typeColor + '20', color: typeColor }}>
              {typeLabel} ({Math.round(share * 100)}% of network)
            </span>
          )}
        </p>
        <p className="text-xs text-slate-500 mb-4">
          Toggle models on/off ·
          {isFiltered
            ? ` Sales scaled to ${typeLabel} network share (${Math.round(share * 100)}% of total)`
            : ' LightGBM (solid purple) tracks actual most closely'}
        </p>
        <ModelTimelineChart data={filteredTimeline} />
      </div>

      {/* ── Radar + Model Cards ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <p className="card-header flex items-center gap-2">
            <FlaskConical size={14} className="text-purple-400" />
            Multi-Dimensional Performance Radar
          </p>
          <p className="text-xs text-slate-500 mb-4">
            5 dimensions: Accuracy · Speed · R² · Low Error · Stability
          </p>
          <ModelRadarChart data={radarData} />
        </div>

        <div className="card">
          <p className="card-header flex items-center gap-2">
            <Info size={14} className="text-cyan-400" />
            Model Descriptions & Tuned Parameters
          </p>
          <p className="text-xs text-slate-500 mb-4">Click any model to expand</p>
          <div className="flex flex-col gap-3">
            {filteredMetrics.map(m => {
              const desc   = modelDescriptions[m.model];
              const isOpen = expandedModel === m.model;
              return (
                <div key={m.model}
                  className="rounded-xl border border-slate-700 overflow-hidden cursor-pointer
                             hover:border-slate-600 transition-all duration-200"
                  onClick={() => setExpandedModel(isOpen ? null : m.model)}>
                  <div className="flex items-center gap-3 p-3">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-200">{m.model}</p>
                      <p className="text-xs text-slate-500">{desc?.fullName}</p>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <span className="text-purple-400 font-medium">RMSE: €{m.afterRMSE}</span>
                      <span className="text-slate-600">{isOpen ? '▲' : '▼'}</span>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="px-4 pb-4 border-t border-slate-700/50">
                      <p className="text-xs text-slate-400 mt-3 leading-relaxed mb-3">
                        {desc?.description}
                      </p>
                      <p className="text-xs font-semibold text-slate-300 mb-2">Tuned Parameters:</p>
                      <div className="flex flex-col gap-1">
                        {desc?.tuningParams.map(p => (
                          <span key={p} className="text-xs font-mono bg-slate-800 text-emerald-400
                                                    rounded px-2 py-1 border border-slate-700">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Key Findings ── */}
      <div className="card border border-amber-500/20 bg-amber-500/5">
        <p className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Trophy size={15} className="text-amber-400" />
          Key Findings
          {isFiltered && <span style={{ color: typeColor }}>— {typeLabel}</span>}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon:'🥇', title:`LightGBM wins${isFiltered ? ` for ${typeLabel}` : ''}`,
              body: `Lowest RMSE (€${winner?.afterRMSE ?? 821}) and MAPE (${winner?.afterMAPE ?? 6.8}%) after tuning.` },
            { icon:'⚡', title:'Tuning pays off',
              body:'All 4 models improved after hyperparameter optimization. SARIMA gained the most % reduction.' },
            { icon:'📅', title:'Prophet handles seasonality',
              body:'Correctly captures Sunday-closure patterns and German public holidays without manual features.' },
            { icon:'🐢', title:'SARIMA is slowest',
              body:'SARIMA took 412 seconds to train — nearly 3x slower than LightGBM — with the highest error.' },
          ].map(f => (
            <div key={f.title} className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
              <p className="text-xl mb-2">{f.icon}</p>
              <p className="text-sm font-semibold text-slate-200 mb-1">{f.title}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
