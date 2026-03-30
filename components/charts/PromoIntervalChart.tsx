// components/charts/PromoIntervalChart.tsx
'use client';

import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { tooltipStyle } from '@/utils/helpers';

interface Props {
  data: { interval: string; count: number; fill: string }[];
}

const RADIAN = Math.PI / 180;

function CustomLabel({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}: {
  cx: number; cy: number; midAngle: number;
  innerRadius: number; outerRadius: number; percent: number;
}) {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export default function PromoIntervalChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="interval"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={105}
          labelLine={false}
          label={CustomLabel}
        >
          {data.map((entry) => (
            <Cell key={entry.interval} fill={entry.fill} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(val: number) => [val.toLocaleString(), 'Stores']}
        />
        <Legend
          formatter={(value) => (
            <span style={{ color: '#cbd5e1', fontSize: 11 }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
