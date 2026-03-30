// components/charts/OpenStoresTimeline.tsx
'use client';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { tooltipStyle } from '@/utils/helpers';

interface Props {
  data: { date: string; openStores: number }[];
}

// Custom tooltip
function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const isSunday = val < 100;
  return (
    <div style={{ ...tooltipStyle, padding: '10px 14px' }}>
      <p className="text-slate-300 font-semibold mb-1">Date: {label}</p>
      <p className="text-blue-400 font-bold">{val.toLocaleString()} stores open</p>
      {isSunday && (
        <p className="text-amber-400 text-xs mt-1">⚠ Sunday / Holiday</p>
      )}
    </div>
  );
}

export default function OpenStoresTimeline({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fill: '#94a3b8', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          interval={6}
        />
        <YAxis
          domain={[0, 900]}
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        {/* Mark Sundays / low-open days */}
        <ReferenceLine y={100} stroke="#f59e0b" strokeDasharray="4 4" strokeOpacity={0.5} label="" />
        <Area
          type="monotone"
          dataKey="openStores"
          stroke="#3b82f6"
          strokeWidth={2.5}
          fill="url(#areaGradient)"
          dot={false}
          activeDot={{ r: 5, fill: '#3b82f6', stroke: '#1e293b', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
