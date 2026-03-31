// components/charts/ModelLeaderboard.tsx
'use client';

import { Trophy, Clock, TrendingDown } from 'lucide-react';
import { ModelResult } from '@/utils/modelComparisonData';

const RANK_ICONS = ['🥇', '🥈', '🥉', '4️⃣'];

interface Props { data: ModelResult[] }

export default function ModelLeaderboard({ data }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-700">
            {['Rank','Model','RMSE (Tuned)','MAPE (Tuned)','R² (Tuned)','Improvement','Train Time','Status'].map(h => (
              <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((m, i) => (
            <tr key={m.model} className={`border-b border-slate-800 transition-colors hover:bg-slate-800/40
              ${m.winner ? 'bg-purple-500/5' : ''}`}>
              {/* Rank */}
              <td className="py-4 pr-4 text-xl">{RANK_ICONS[i]}</td>

              {/* Model name */}
              <td className="py-4 pr-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                  <span className="font-semibold text-slate-200">{m.model}</span>
                </div>
              </td>

              {/* RMSE */}
              <td className="py-4 pr-4">
                <div className="flex flex-col">
                  <span className="font-bold text-white">€{m.afterRMSE.toLocaleString()}</span>
                  <span className="text-xs text-slate-500 line-through">€{m.beforeRMSE.toLocaleString()}</span>
                </div>
              </td>

              {/* MAPE */}
              <td className="py-4 pr-4">
                <div className="flex flex-col">
                  <span className="font-bold text-white">{m.afterMAPE}%</span>
                  <span className="text-xs text-slate-500 line-through">{m.beforeMAPE}%</span>
                </div>
              </td>

              {/* R2 */}
              <td className="py-4 pr-4">
                <div className="flex flex-col">
                  <span className="font-bold text-white">{m.afterR2.toFixed(3)}</span>
                  <span className="text-xs text-slate-500 line-through">{m.beforeR2.toFixed(3)}</span>
                </div>
              </td>

              {/* Improvement */}
              <td className="py-4 pr-4">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <TrendingDown size={13} />
                  -{m.improvement}%
                </span>
              </td>

              {/* Train time */}
              <td className="py-4 pr-4">
                <span className="flex items-center gap-1 text-slate-400 text-xs">
                  <Clock size={12} />
                  {m.trainTime}s
                </span>
              </td>

              {/* Status */}
              <td className="py-4">
                {m.winner ? (
                  <span className="flex items-center gap-1.5 bg-purple-500/20 text-purple-300
                                   border border-purple-500/30 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap">
                    <Trophy size={11} /> Winner
                  </span>
                ) : (
                  <span className="text-xs text-slate-600">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Metric explanation */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-500">
        <div className="bg-slate-800/50 rounded-lg p-3">
          <span className="text-slate-300 font-medium">RMSE</span> — Root Mean Squared Error. Lower = better. Penalises large errors heavily.
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3">
          <span className="text-slate-300 font-medium">MAPE</span> — Mean Absolute Percentage Error. Lower = better. Interpretable as % off target.
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3">
          <span className="text-slate-300 font-medium">R²</span> — Coefficient of Determination. Higher = better. 1.0 = perfect fit.
        </div>
      </div>
    </div>
  );
}
