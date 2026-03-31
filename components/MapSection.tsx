// components/MapSection.tsx
// Drop this section into app/page.tsx after the ForecastSection
'use client';

import dynamic from 'next/dynamic';
import { Map } from 'lucide-react';
import { storeGeoData } from '@/utils/storeGeoData';

// Dynamically import the map so Leaflet only loads on client (no SSR)
const StoreMap = dynamic(
  () => import('@/components/charts/StoreMap'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[520px] flex items-center justify-center bg-slate-800 rounded-2xl border border-slate-700">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Loading interactive map...</p>
        </div>
      </div>
    ),
  }
);

export default function MapSection() {
  return (
    <section id="map" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* ── Section Header ── */}
      <div className="flex items-start gap-3 mb-6">
        <div className="mt-0.5 p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
          <Map size={18} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-100">
            Store Network Map
            <span className="ml-2 badge bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs align-middle">
              1,115 Stores
            </span>
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            All Rossmann stores plotted across Germany · Colour by Store Type, Promo2 Status, or Competition Distance
          </p>
        </div>
      </div>

      {/* ── Map Card ── */}
      <div className="card">
        <StoreMap stores={storeGeoData} />
      </div>

      {/* ── Quick insights below map ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {[
          {
            icon: '🔵',
            title: 'NRW dominates',
            body: 'North Rhine-Westphalia has the highest store density — Cologne, Dortmund, Essen and Düsseldorf cluster together in the west.',
          },
          {
            icon: '🟡',
            title: 'Berlin & Hamburg hubs',
            body: 'The two largest cities show dense clusters of 80+ and 55+ stores respectively, with high Promo2 enrolment.',
          },
          {
            icon: '🟣',
            title: 'Eastern Germany sparser',
            body: 'Dresden, Leipzig and Erfurt have lower store density relative to population — potential expansion opportunity.',
          },
        ].map((ins) => (
          <div key={ins.title} className="card border border-slate-700">
            <p className="text-2xl mb-2">{ins.icon}</p>
            <p className="font-semibold text-slate-200 text-sm mb-1">{ins.title}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{ins.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
