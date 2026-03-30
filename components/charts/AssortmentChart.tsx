// components/charts/AssortmentChart.tsx
'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { tooltipStyle } from '@/utils/helpers';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

interface Props {
  data: { type: string; count: number; fill: string }[];
}

export default function AssortmentChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
        <XAxis
          dataKey="type"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
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
        <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={80}>
          {data.map((entry, i) => (
            <Cell key={entry.type} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
