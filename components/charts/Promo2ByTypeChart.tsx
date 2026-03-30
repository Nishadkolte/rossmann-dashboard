// components/charts/Promo2ByTypeChart.tsx
'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';
import { tooltipStyle } from '@/utils/helpers';

interface Props {
  data: { storeType: string; enrolled: number; notEnrolled: number }[];
}

export default function Promo2ByTypeChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
        barCategoryGap="30%"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
        <XAxis
          dataKey="storeType"
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
        <Legend
          formatter={(value) => (
            <span style={{ color: '#cbd5e1', fontSize: 12 }}>{value}</span>
          )}
        />
        <Bar dataKey="enrolled"    name="Enrolled in Promo2"     fill="#3b82f6" radius={[4,4,0,0]} />
        <Bar dataKey="notEnrolled" name="Not Enrolled"           fill="#475569" radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
