// components/charts/ForecastTimelineChart.tsx
'use client';

import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';

interface DataPoint {
  date: string;
  actual: number;
  predicted: number;
  promo: number;
  schoolHoliday: number;
}

interface Props {
  data: DataPoint[];
  showPromo: boolean;
}

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
  payload: { promo: number; schoolHoliday: number };
}

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const promo = payload[0]?.payload?.promo;
  const school = payload[0]?.payload?.schoolHoliday;
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl p-3 text-xs shadow-xl">
      <p className="text-slate-300 font-bold mb-2">📅 {label}</p>
      {payload.map((p) => (
        p.value > 0 && (
          <p key={p.name} style={{ color: p.color }} className="mb-0.5">
            {p.name}: €{(p.value / 1_000_000).toFixed(2)}M
          </p>
        )
      ))}
      <div className="mt-2 pt-2 border-t border-slate-700 flex gap-2">
        {promo === 1 && <span className="bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">🏷️ Promo</span>}
        {school === 1 && <span className="bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">🏫 School Hol</span>}
      </div>
    </div>
  );
}

export default function ForecastTimelineChart({ data, showPromo }: Props) {
  const filtered = showPromo ? data : data.filter(d => d.promo === 0 || d.actual === 0);

  return (
    <ResponsiveContainer width="100%" height={340}>
      <ComposedChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
        <defs>
          <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#10b981" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fill: '#94a3b8', fontSize: 10 }}
          axisLine={false} tickLine={false}
          interval={5}
        />
        <YAxis
          tick={{ fill: '#94a3b8', fontSize: 10 }}
          axisLine={false} tickLine={false}
          tickFormatter={(v) => `€${(v / 1_000_000).toFixed(1)}M`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => (
            <span style={{ color: '#cbd5e1', fontSize: 12 }}>
              {value === 'actual' ? '✅ Actual Sales' :
               value === 'predicted' ? '🔮 Predicted Sales' : value}
            </span>
          )}
        />
        {/* Promo bars in background */}
        {showPromo && (
          <Bar
            dataKey="promo"
            name="Promo Day"
            fill="#f59e0b"
            fillOpacity={0.12}
            barSize={8}
            yAxisId={0}
          />
        )}
        {/* Sunday reference line hint */}
        <ReferenceLine y={500000} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.3} />
        <Line
          type="monotone"
          dataKey="actual"
          name="actual"
          stroke="#10b981"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, fill: '#10b981' }}
        />
        <Line
          type="monotone"
          dataKey="predicted"
          name="predicted"
          stroke="#3b82f6"
          strokeWidth={2}
          strokeDasharray="6 3"
          dot={false}
          activeDot={{ r: 5, fill: '#3b82f6' }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
