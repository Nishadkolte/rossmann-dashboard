// components/charts/ModelTimelineChart.tsx
'use client';

import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  date:     string;
  actual:   number;
  LightGBM: number;
  XGBoost:  number;
  Prophet:  number;
  SARIMA:   number;
}

interface Props { data: DataPoint[] }

// ── Format euros based on magnitude ─────────────────────────
function fmtEuro(v: number): string {
  if (v === 0) return '€0';
  return '€' + Math.round(v).toLocaleString('en-US');
}

const MODELS = [
  { key: 'actual',   label: 'Actual Sales',  color: '#ffffff', dash: ''    },
  { key: 'XGBoost',  label: 'XGBoost 🏆',    color: '#f59e0b', dash: ''    },
  { key: 'LightGBM', label: 'LightGBM',      color: '#8b5cf6', dash: '6 3' },
  { key: 'Prophet',  label: 'Prophet',        color: '#06b6d4', dash: '4 4' },
  { key: 'SARIMA',   label: 'SARIMA',         color: '#10b981', dash: '2 3' },
];

interface TooltipItem {
  name:  string;
  value: number;
  color: string;
}

function CustomTooltip({ active, payload, label }: {
  active?:  boolean;
  payload?: TooltipItem[];
  label?:   string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl p-3 text-xs shadow-xl min-w-[180px]">
      <p className="text-slate-300 font-bold mb-2">📅 {label}</p>
      {payload.filter(p => p.value > 0).map(p => (
        <p key={p.name} style={{ color: p.color }} className="mb-1">
          {p.name}: <span className="font-semibold">{fmtEuro(p.value)}</span>
        </p>
      ))}
    </div>
  );
}

export default function ModelTimelineChart({ data }: Props) {
  const [visible, setVisible] = useState<Record<string, boolean>>({
    actual: true, XGBoost: true, LightGBM: true, Prophet: true, SARIMA: true,
  });

  const toggle = (key: string) =>
    setVisible(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div>
      {/* Toggle buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {MODELS.map(m => (
          <button
            key={m.key}
            onClick={() => toggle(m.key)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                       border transition-all duration-150"
            style={visible[m.key]
              ? { backgroundColor: m.color + '30', borderColor: m.color, color: m.color }
              : { borderColor: '#475569', color: '#475569', background: 'transparent' }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: visible[m.key] ? m.color : '#475569' }} />
            {m.label}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />

          <XAxis
            dataKey="date"
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            interval={4}
          />

          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={fmtEuro}
            width={90}
          />

          <Tooltip content={<CustomTooltip />} />

          {MODELS.map(m => visible[m.key] && (
            <Line
              key={m.key}
              type="monotone"
              dataKey={m.key}
              name={m.label}
              stroke={m.color}
              strokeWidth={m.key === 'actual' ? 2.5 : 1.8}
              strokeDasharray={m.dash}
              dot={false}
              activeDot={{ r: 4, fill: m.color }}
              strokeOpacity={m.key === 'actual' ? 1 : 0.85}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Legend note */}
      <p className="text-xs text-slate-500 mt-2 text-center">
        Values show average daily sales per store (€) · Test period: Jun–Jul 2015
      </p>
    </div>
  );
}
