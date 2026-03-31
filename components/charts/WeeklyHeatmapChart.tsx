// components/charts/WeeklyHeatmapChart.tsx
'use client';

import { useMemo } from 'react';

interface HeatCell {
  week: string;
  day: string;
  sales: number;
}

interface Props {
  data: HeatCell[];
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];

function interpolateColor(value: number, min: number, max: number): string {
  if (value === 0) return '#0f172a'; // closed — near black
  const t = (value - min) / (max - min);
  // Deep blue → cyan → green
  if (t < 0.5) {
    const u = t * 2;
    const r = Math.round(30  + u * (6   - 30));
    const g = Math.round(58  + u * (182 - 58));
    const b = Math.round(138 + u * (212 - 138));
    return `rgb(${r},${g},${b})`;
  } else {
    const u = (t - 0.5) * 2;
    const r = Math.round(6   + u * (16  - 6));
    const g = Math.round(182 + u * (185 - 182));
    const b = Math.round(212 + u * (129 - 212));
    return `rgb(${r},${g},${b})`;
  }
}

export default function WeeklyHeatmapChart({ data }: Props) {
  const cellMap = useMemo(() => {
    const map: Record<string, number> = {};
    data.forEach(d => { map[`${d.week}-${d.day}`] = d.sales; });
    return map;
  }, [data]);

  const nonZero = data.filter(d => d.sales > 0).map(d => d.sales);
  const min = Math.min(...nonZero);
  const max = Math.max(...nonZero);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[520px]">
        {/* Header row */}
        <div className="grid mb-1" style={{ gridTemplateColumns: '48px repeat(7, 1fr)' }}>
          <div />
          {DAYS.map(day => (
            <div key={day} className="text-center text-xs font-semibold text-slate-400 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Heatmap rows */}
        {WEEKS.map(week => (
          <div key={week} className="grid mb-1.5" style={{ gridTemplateColumns: '48px repeat(7, 1fr)', gap: '4px' }}>
            <div className="flex items-center text-xs text-slate-500 font-medium">{week}</div>
            {DAYS.map(day => {
              const sales = cellMap[`${week}-${day}`] ?? 0;
              const bg = interpolateColor(sales, min, max);
              const isSunday = day === 'Sun';
              return (
                <div
                  key={day}
                  className="relative rounded-lg flex flex-col items-center justify-center py-3 cursor-default
                             transition-transform duration-150 hover:scale-105 hover:z-10 group"
                  style={{ backgroundColor: bg, minHeight: '58px' }}
                  title={`${week} ${day}: €${sales.toLocaleString()}`}
                >
                  {isSunday ? (
                    <span className="text-slate-600 text-lg">🔒</span>
                  ) : (
                    <>
                      <span className="text-white text-xs font-bold leading-none">
                        €{(sales / 1000).toFixed(1)}k
                      </span>
                      <span className="text-white/60 text-[9px] mt-0.5">avg/store</span>
                    </>
                  )}
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block
                                  bg-slate-900 border border-slate-600 rounded-lg px-2 py-1 text-xs text-white
                                  whitespace-nowrap shadow-xl z-20 pointer-events-none">
                    {week} {day}: <span className="font-bold text-blue-300">€{sales.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* Legend */}
        <div className="flex items-center gap-2 mt-4 justify-end">
          <span className="text-xs text-slate-500">Lower</span>
          <div className="flex rounded overflow-hidden h-3 w-36">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="flex-1"
                style={{ backgroundColor: interpolateColor(min + (max - min) * (i / 19), min, max) }}
              />
            ))}
          </div>
          <span className="text-xs text-slate-500">Higher</span>
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
          <span className="text-xs text-slate-500">Closed</span>
        </div>
      </div>
    </div>
  );
}
