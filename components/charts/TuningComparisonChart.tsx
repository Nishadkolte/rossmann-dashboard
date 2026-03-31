// components/charts/TuningComparisonChart.tsx
'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, LabelList,
} from 'recharts';
import { ModelResult } from '@/utils/modelComparisonData';

interface Props {
  data: ModelResult[];
  metric: 'RMSE' | 'MAPE' | 'R2';
}

const METRIC_CONFIG = {
  RMSE: { before: 'beforeRMSE', after: 'afterRMSE', label: 'RMSE (€)', lower: true,
          fmt: (v: number) => `€${v.toLocaleString()}` },
  MAPE: { before: 'beforeMAPE', after: 'afterMAPE', label: 'MAPE (%)', lower: true,
          fmt: (v: number) => `${v}%` },
  R2:   { before: 'beforeR2',   after: 'afterR2',   label: 'R² Score', lower: false,
          fmt: (v: number) => v.toFixed(3) },
};

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
  payload: ModelResult;
}

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl p-3 text-xs shadow-xl">
      <p className="text-slate-200 font-bold mb-2">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }} className="mb-1">
          {p.name}: <span className="font-semibold text-white">{p.value}</span>
        </p>
      ))}
      {payload.length === 2 && (
        <p className="mt-2 pt-2 border-t border-slate-700 text-emerald-400 font-bold">
          Improvement: {Math.abs(((payload[1].value - payload[0].value) / payload[0].value) * 100).toFixed(1)}%
        </p>
      )}
    </div>
  );
}

export default function TuningComparisonChart({ data, metric }: Props) {
  const cfg = METRIC_CONFIG[metric];

  const chartData = data.map(m => ({
    model:  m.model,
    Before: Number(m[cfg.before as keyof ModelResult]),
    After:  Number(m[cfg.after  as keyof ModelResult]),
    color:  m.color,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 24, right: 20, left: 10, bottom: 5 }} barCategoryGap="25%">
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
        <XAxis dataKey="model" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          axisLine={false} tickLine={false}
          tickFormatter={cfg.fmt}
          domain={metric === 'R2' ? [0.8, 1] : undefined}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff06' }} />
        <Legend
          formatter={(value) => (
            <span style={{ color: '#cbd5e1', fontSize: 12 }}>
              {value === 'Before' ? '⚪ Before Tuning' : '🟢 After Tuning'}
            </span>
          )}
        />
        <Bar dataKey="Before" name="Before" fill="#475569" radius={[4,4,0,0]}>
          <LabelList dataKey="Before" position="top"
            formatter={cfg.fmt}
            style={{ fill: '#64748b', fontSize: 9 }} />
        </Bar>
        <Bar dataKey="After"  name="After"  fill="#3b82f6" radius={[4,4,0,0]}>
          <LabelList dataKey="After" position="top"
            formatter={cfg.fmt}
            style={{ fill: '#93c5fd', fontSize: 9 }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
