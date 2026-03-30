// components/ui/KpiCard.tsx
'use client';

import { type ReactNode } from 'react';
import clsx from 'clsx';

interface KpiCardProps {
  title: string;
  value: string;
  subtext?: string;
  icon: ReactNode;
  accentColor?: string; // Tailwind bg class e.g. 'bg-blue-500/20'
  iconColor?: string;   // Tailwind text class e.g. 'text-blue-400'
  trend?: {
    label: string;
    positive: boolean;
  };
}

export default function KpiCard({
  title,
  value,
  subtext,
  icon,
  accentColor = 'bg-blue-500/10',
  iconColor = 'text-blue-400',
  trend,
}: KpiCardProps) {
  return (
    <div className="card animate-fade-in group hover:border-slate-600 transition-all duration-200">
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div className={clsx('p-2.5 rounded-xl', accentColor)}>
          <span className={clsx('w-5 h-5', iconColor)}>{icon}</span>
        </div>

        {/* Trend badge */}
        {trend && (
          <span
            className={clsx(
              'badge text-xs',
              trend.positive
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-amber-500/10 text-amber-400'
            )}
          >
            {trend.positive ? '▲' : '▼'} {trend.label}
          </span>
        )}
      </div>

      {/* Value */}
      <div className="mt-4">
        <p className="text-3xl font-bold text-slate-100 tabular-nums leading-none">
          {value}
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-400 uppercase tracking-wide">
          {title}
        </p>
        {subtext && (
          <p className="mt-1 text-xs text-slate-500">{subtext}</p>
        )}
      </div>
    </div>
  );
}
