// components/charts/StoreTypeChart.tsx
'use client';

import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { tooltipStyle } from '@/utils/helpers';

const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b'];

const RADIAN = Math.PI / 180;

function CustomLabel({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}: {
  cx: number; cy: number; midAngle: number;
  innerRadius: number; outerRadius: number; percent: number;
}) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.04) return null;
  return (
    <text
      x={x} y={y}
      fill="white" textAnchor="middle" dominantBaseline="central"
      fontSize={12} fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

interface Props {
  data: { type: string; count: number; fill: string }[];
}

export default function StoreTypeChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="type"
          cx="50%"
          cy="50%"
          outerRadius={105}
          labelLine={false}
          label={CustomLabel}
        >
          {data.map((entry, i) => (
            <Cell key={entry.type} fill={COLORS[i % COLORS.length]} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(val: number) => [val.toLocaleString(), 'Stores']}
        />
        <Legend
          formatter={(value) => (
            <span style={{ color: '#cbd5e1', fontSize: 12 }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
