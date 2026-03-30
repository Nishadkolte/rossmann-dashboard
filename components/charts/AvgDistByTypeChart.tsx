// components/charts/AvgDistByTypeChart.tsx
'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LabelList,
} from 'recharts';
import { tooltipStyle } from '@/utils/helpers';

const COLORS = ['#3b82f6', '#f59e0b', '#06b6d4', '#8b5cf6'];

interface Props {
  data: { type: string; avgDistance: number }[];
}

export default function AvgDistByTypeChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 60, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${(v / 1000).toFixed(1)}km`}
        />
        <YAxis
          type="category"
          dataKey="type"
          tick={{ fill: '#cbd5e1', fontSize: 13, fontWeight: 500 }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(val: number) => [`${(val / 1000).toFixed(2)} km`, 'Avg Competition Distance']}
          cursor={{ fill: '#ffffff08' }}
        />
        <Bar dataKey="avgDistance" radius={[0, 6, 6, 0]} maxBarSize={36}>
          {data.map((entry, i) => (
            <Cell key={entry.type} fill={COLORS[i % COLORS.length]} />
          ))}
          <LabelList
            dataKey="avgDistance"
            position="right"
            formatter={(v: number) => `${(v / 1000).toFixed(1)} km`}
            style={{ fill: '#94a3b8', fontSize: 11 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
