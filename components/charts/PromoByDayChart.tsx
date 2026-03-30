// components/charts/PromoByDayChart.tsx
'use client';

import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { tooltipStyle } from '@/utils/helpers';

interface PromoDay {
  dayName: string;
  promoRate: number;
}
interface SchoolDay {
  dayName: string;
  rate: number;
}

interface Props {
  promoData: PromoDay[];
  schoolData: SchoolDay[];
}

export default function PromoByDayChart({ promoData, schoolData }: Props) {
  // Merge into one array for radar
  const merged = promoData.map((p) => {
    const s = schoolData.find(sd => sd.dayName === p.dayName);
    return {
      day: p.dayName,
      promoRate: p.promoRate,
      schoolHoliday: s?.rate ?? 0,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius={100} data={merged}>
        <PolarGrid stroke="#334155" />
        <PolarAngleAxis
          dataKey="day"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fill: '#64748b', fontSize: 10 }}
          axisLine={false}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(val: number, name: string) => [
            `${val.toFixed(1)}%`,
            name === 'promoRate' ? 'Promo Active' : 'School Holiday',
          ]}
        />
        <Legend
          formatter={(value) => (
            <span style={{ color: '#cbd5e1', fontSize: 12 }}>
              {value === 'promoRate' ? 'Promo Active Rate' : 'School Holiday Rate'}
            </span>
          )}
        />
        <Radar name="promoRate"     dataKey="promoRate"     stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} strokeWidth={2} />
        <Radar name="schoolHoliday" dataKey="schoolHoliday" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
