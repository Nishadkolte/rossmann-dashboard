// components/charts/PromoImpactChart.tsx
'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Cell, LabelList,
} from 'recharts';

interface Props {
  data: { storeType: string; withoutPromo: number; withPromo: number; liftPct: number }[];
}

const TYPE_COLORS: Record<string, string> = {
  'Type A': '#3b82f6',
  'Type B': '#f59e0b',
  'Type C': '#06b6d4',
  'Type D': '#8b5cf6',
};

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { name: string; value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const lift = payload[0]?.payload?.liftPct;
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl p-3 text-xs shadow-xl">
      <p className="text-slate-200 font-bold mb-2">{label}</p>
      <p className="text-slate-400 mb-1">Without Promo: <span className="text-white font-semibold">€{payload[0]?.value?.toLocaleString()}</span></p>
      <p className="text-amber-400 mb-1">With Promo: <span className="text-white font-semibold">€{payload[1]?.value?.toLocaleString()}</span></p>
      <p className="mt-2 pt-2 border-t border-slate-700 text-emerald-400 font-bold">
        🚀 Revenue Lift: +{lift}%
      </p>
    </div>
  );
}

export default function PromoImpactChart({ data }: Props) {
  return (
    <div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 5 }} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="storeType" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false} tickLine={false}
            tickFormatter={(v) => `€${v.toLocaleString()}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff06' }} />
          <Legend
            formatter={(value) => (
              <span style={{ color: '#cbd5e1', fontSize: 12 }}>
                {value === 'withoutPromo' ? '⚪ No Promo (baseline)' : '🟡 With Promo (predicted)'}
              </span>
            )}
          />
          <Bar dataKey="withoutPromo" name="withoutPromo" fill="#475569" radius={[4,4,0,0]} />
          <Bar dataKey="withPromo"    name="withPromo"    radius={[4,4,0,0]}>
            {data.map((entry) => (
              <Cell key={entry.storeType} fill={TYPE_COLORS[entry.storeType] ?? '#3b82f6'} />
            ))}
            <LabelList
              dataKey="liftPct"
              position="top"
              formatter={(v: number) => `+${v}%`}
              style={{ fill: '#4ade80', fontSize: 11, fontWeight: 700 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Lift cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        {data.map((d) => (
          <div
            key={d.storeType}
            className="bg-slate-700/40 rounded-xl p-3 text-center border border-slate-700"
            style={{ borderColor: TYPE_COLORS[d.storeType] + '40' }}
          >
            <p className="text-xs text-slate-400 mb-1">{d.storeType}</p>
            <p className="text-2xl font-extrabold" style={{ color: TYPE_COLORS[d.storeType] }}>
              +{d.liftPct}%
            </p>
            <p className="text-xs text-slate-500 mt-0.5">promo lift</p>
            <p className="text-xs text-emerald-400 mt-1 font-semibold">
              +€{(d.withPromo - d.withoutPromo).toLocaleString()}/day
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
