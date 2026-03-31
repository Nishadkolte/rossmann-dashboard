// components/ModelComparisonSection.tsx
'use client';

import { useState } from 'react';
import { FlaskConical, Trophy, TrendingDown, Zap, Info } from 'lucide-react';

import ModelLeaderboard      from '@/components/charts/ModelLeaderboard';
import TuningComparisonChart from '@/components/charts/TuningComparisonChart';
import ModelTimelineChart    from '@/components/charts/ModelTimelineChart';
import ModelRadarChart       from '@/components/charts/ModelRadarChart';

import {
  leaderboardData,
  tuningData,
  timelineCompareData,
  radarData,
  modelDescriptions,
} from '@/utils/modelComparisonData';

type Metric = 'RMSE' | 'MAPE' | 'R2';

export default function ModelComparisonSection() {
  const [tuningMetric, setTuningMetric] = useState<Metric>('RMSE');
  const [expandedModel, setExpandedModel] = useState<string | null>(null);

  const winner = leaderboardData.find(m => m.winner);

  return (
    <section id="models" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* ── Header ── */}
      <div className="flex items-start gap-3 mb-6">
        <div className="mt-0.5 p-2 bg-amber-500/10 rounded-lg text-amber-400">
          <FlaskConical size={18} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-100">
            Advanced Model Comparison
            <span className="ml-2 badge bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs align-middle">
              4 Models · Tuned
            </span>
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            LightGBM · XGBoost · Prophet · SARIMA — parameter-tuned and benchmarked head-to-head
          </p>
        </div>
      </div>

      {/* ── Winner Banner ── */}
      {winner && (
        <div className="card border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-blue-500/5 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-4xl">🏆</div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-0.5">Winning Model</p>
              <p className="text-2xl font-extrabold text-white">{winner.model}</p>
              <p className="text-sm text-slate-400">Selected for deployment · Lowest RMSE after hyperparameter tuning</p>
            </div>
            <div className="flex gap-6 ml-auto">
              {[
                { label: 'RMSE',  value: `€${winner.afterRMSE}`, color: 'text-purple-400' },
                { label: 'MAPE',  value: `${winner.afterMAPE}%`, color: 'text-blue-400'   },
                { label: 'R²',    value: winner.afterR2.toFixed(3), color: 'text-emerald-400' },
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

      {/* ── Leaderboard Table ── */}
      <div className="card mb-6">
        <p className="card-header flex items-center gap-2">
          <Trophy size={14} className="text-amber-400" />
          Model Leaderboard — After Hyperparameter Tuning
        </p>
        <p className="text-xs text-slate-500 mb-5">
          Strikethrough values show pre-tuning baseline. All metrics computed on Aug–Sep 2015 test set.
        </p>
        <ModelLeaderboard data={leaderboardData} />
      </div>

      {/* ── Before vs After Tuning ── */}
      <div className="card mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <p className="card-header flex items-center gap-2">
              <Zap size={14} className="text-blue-400" />
              Hyperparameter Tuning Impact
            </p>
            <p className="text-xs text-slate-500">Before vs After tuning — all 4 models</p>
          </div>
          {/* Metric selector */}
          <div className="flex rounded-lg overflow-hidden border border-slate-600">
            {(['RMSE','MAPE','R2'] as Metric[]).map(m => (
              <button
                key={m}
                onClick={() => setTuningMetric(m)}
                className={`px-4 py-1.5 text-xs font-semibold transition-colors duration-150
                  ${tuningMetric === m
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-400 hover:text-white'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <TuningComparisonChart data={tuningData} metric={tuningMetric} />
      </div>

      {/* ── Multi-model Timeline ── */}
      <div className="card mb-6">
        <p className="card-header flex items-center gap-2">
          <TrendingDown size={14} className="text-emerald-400" />
          All Models vs Actual Sales — Aug 1 to Sep 17, 2015
        </p>
        <p className="text-xs text-slate-500 mb-4">
          Toggle individual models on/off · LightGBM (solid purple) tracks actual most closely
        </p>
        <ModelTimelineChart data={timelineCompareData} />
      </div>

      {/* ── Radar + Model Cards ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Radar */}
        <div className="card">
          <p className="card-header flex items-center gap-2">
            <FlaskConical size={14} className="text-purple-400" />
            Multi-Dimensional Performance Radar
          </p>
          <p className="text-xs text-slate-500 mb-4">
            5 dimensions: Accuracy · Speed · R² · Low Error · Stability (higher = better on all axes)
          </p>
          <ModelRadarChart data={radarData} />
        </div>

        {/* Model Cards */}
        <div className="card">
          <p className="card-header flex items-center gap-2">
            <Info size={14} className="text-cyan-400" />
            Model Descriptions & Tuned Parameters
          </p>
          <p className="text-xs text-slate-500 mb-4">Click any model to expand details</p>
          <div className="flex flex-col gap-3">
            {leaderboardData.map(m => {
              const desc = modelDescriptions[m.model];
              const isOpen = expandedModel === m.model;
              return (
                <div
                  key={m.model}
                  className="rounded-xl border border-slate-700 overflow-hidden cursor-pointer
                             hover:border-slate-600 transition-all duration-200"
                  onClick={() => setExpandedModel(isOpen ? null : m.model)}
                >
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
          Key Findings from Model Comparison
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: '🥇', title: 'LightGBM wins',
              body: 'Lowest RMSE (€821) and MAPE (6.8%) after tuning. Fastest training among tree-based models at 142s.',
            },
            {
              icon: '⚡', title: 'Tuning pays off',
              body: 'All 4 models improved after hyperparameter optimization. SARIMA gained the most (+13.6% RMSE reduction).',
            },
            {
              icon: '📅', title: 'Prophet handles seasonality',
              body: 'Prophet correctly captures weekly Sunday-closure patterns and German public holidays without manual feature engineering.',
            },
            {
              icon: '🐢', title: 'SARIMA is slowest',
              body: 'SARIMA took 412 seconds to train — nearly 3x slower than LightGBM — and still produced the highest error.',
            },
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
