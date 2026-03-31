// components/charts/ModelRadarChart.tsx
'use client';

import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

interface RadarPoint {
  model: string;
  Accuracy: number;
  Speed: number;
  R2Score: number;
  LowError: number;
  Stability: number;
  color: string;
}

interface Props { data: RadarPoint[] }

// Recharts radar needs data in axis-first format
function transformForRadar(data: RadarPoint[]) {
  const axes = ['Accuracy','Speed','R2Score','LowError','Stability'];
  return axes.map(axis => {
    const row: Record<string, string | number> = { axis };
    data.forEach(m => { row[m.model] = m[axis as keyof RadarPoint] as number; });
    return row;
  });
}

interface TooltipItem {
  name: string;
  value: number;
  color: string;
}

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: TooltipItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl p-3 text-xs shadow-xl">
      <p className="text-slate-200 font-bold mb-2">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }} className="mb-1">
          {p.name}: <span className="font-semibold text-white">{p.value.toFixed(1)}/100</span>
        </p>
      ))}
    </div>
  );
}

export default function ModelRadarChart({ data }: Props) {
  const chartData = transformForRadar(data);

  return (
    <ResponsiveContainer width="100%" height={340}>
      <RadarChart cx="50%" cy="50%" outerRadius={110} data={chartData}>
        <PolarGrid stroke="#334155" />
        <PolarAngleAxis dataKey="axis" tick={{ fill: '#94a3b8', fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0,100]} tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => (
            <span style={{ color: '#cbd5e1', fontSize: 12 }}>{value}</span>
          )}
        />
        {data.map(m => (
          <Radar
            key={m.model}
            name={m.model}
            dataKey={m.model}
            stroke={m.color}
            fill={m.color}
            fillOpacity={0.12}
            strokeWidth={2}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
}
