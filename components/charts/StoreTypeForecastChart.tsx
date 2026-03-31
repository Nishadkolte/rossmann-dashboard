// components/charts/StoreTypeForecastChart.tsx
'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, LabelList,
} from 'recharts';

interface Props {
  data: { storeType: string; promoOff: number; promoOn: number; predicted: number }[];
}

interface TypeTooltipItem {
  name: string;
  value: number;
  color: string;
  payload: { promoOff: number; promoOn: number; predicted: number };
}

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: TypeTooltipItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl p-3 text-xs shadow-xl">
      <p className="text-slate-200 font-bold mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="mb-1">
          {p.name}: <span className="font-semibold">€{p.value.toLocaleString()}</span>
        </p>
      ))}
      {payload.length >= 2 && (
        <p className="mt-2 pt-2 border-t border-slate-700 text-emerald-400">
          Promo Lift: +{(((payload[1].value - payload[0].value) / payload[0].value) * 100).toFixed(1)}%
        </p>
      )}
    </div>
  );
}

export default function StoreTypeForecastChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 5 }} barCategoryGap="25%">
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
        <XAxis
          dataKey="storeType"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={false} tickLine={false}
        />
        <YAxis
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          axisLine={false} tickLine={false}
          tickFormatter={(v) => `€${v.toLocaleString()}`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff08' }} />
        <Legend
          formatter={(value) => (
            <span style={{ color: '#cbd5e1', fontSize: 12 }}>
              {value === 'promoOff' ? '⚪ No Promo' :
               value === 'promoOn' ? '🟡 With Promo' :
               '🔵 Predicted Avg'}
            </span>
          )}
        />
        <Bar dataKey="promoOff"  name="promoOff"  fill="#475569" radius={[4,4,0,0]}>
          <LabelList dataKey="promoOff"  position="top" formatter={(v: number) => `€${(v/1000).toFixed(1)}k`} style={{ fill: '#64748b', fontSize: 10 }} />
        </Bar>
        <Bar dataKey="promoOn"   name="promoOn"   fill="#f59e0b" radius={[4,4,0,0]}>
          <LabelList dataKey="promoOn"   position="top" formatter={(v: number) => `€${(v/1000).toFixed(1)}k`} style={{ fill: '#fbbf24', fontSize: 10 }} />
        </Bar>
        <Bar dataKey="predicted" name="predicted" fill="#3b82f6" radius={[4,4,0,0]}>
          <LabelList dataKey="predicted" position="top" formatter={(v: number) => `€${(v/1000).toFixed(1)}k`} style={{ fill: '#60a5fa', fontSize: 10 }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
