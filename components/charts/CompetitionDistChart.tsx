// components/charts/CompetitionDistChart.tsx
'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { tooltipStyle } from '@/utils/helpers';

// Gradient from near (amber) → far (blue)
const COLORS = ['#f59e0b', '#f97316', '#10b981', '#3b82f6', '#6366f1', '#8b5cf6'];

interface Props {
  data: { range: string; count: number }[];
  maxDistance: number; // slider value in meters
}

export default function CompetitionDistChart({ data, maxDistance }: Props) {
  // Map range label to max boundary for filtering
  const rangeBounds: Record<string, number> = {
    '<500m':    500,
    '500m–1km': 1000,
    '1–2km':    2000,
    '2–5km':    5000,
    '5–10km':   10000,
    '>10km':    Infinity,
  };

  const filtered = data.filter(d => {
    const bound = rangeBounds[d.range] ?? 0;
    return bound <= maxDistance || (d.range === '>10km' && maxDistance >= 10000);
  });

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={filtered}
        margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
        <XAxis
          dataKey="range"
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(val: number) => [val.toLocaleString(), 'Stores']}
          cursor={{ fill: '#ffffff08' }}
        />
        <Bar dataKey="count" name="Stores" radius={[6, 6, 0, 0]} maxBarSize={70}>
          {filtered.map((entry, i) => (
            <Cell key={entry.range} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
