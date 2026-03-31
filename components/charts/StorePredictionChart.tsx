// components/charts/StorePredictionChart.tsx
'use client';

import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { Search } from 'lucide-react';

interface StoreData {
  store: string;
  storeType: string;
  predictedSales: number;
  promo: number;
}

interface Props {
  data: StoreData[];
}

const TYPE_COLORS: Record<string, string> = {
  'Type A': '#3b82f6',
  'Type B': '#f59e0b',
  'Type C': '#06b6d4',
  'Type D': '#8b5cf6',
};

function CustomTooltip({ active, payload }: {
  active?: boolean;
  payload?: { payload: StoreData }[];
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl p-3 text-xs shadow-xl">
      <p className="text-slate-200 font-bold mb-1">{d.store}</p>
      <p className="text-slate-400">Type: <span className="text-white">{d.storeType}</span></p>
      <p className="text-blue-400 font-semibold mt-1">
        Predicted: €{d.predictedSales.toLocaleString()}/day
      </p>
      <p className={`mt-1 ${d.promo ? 'text-amber-400' : 'text-slate-500'}`}>
        {d.promo ? '🏷️ Promo active' : 'No promo'}
      </p>
    </div>
  );
}

export default function StorePredictionChart({ data }: Props) {
  const [search,     setSearch]     = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [promoFilter, setPromoFilter] = useState('all');
  const [topN, setTopN] = useState(10);

  const filtered = data
    .filter(d => {
      const matchSearch = d.store.toLowerCase().includes(search.toLowerCase());
      const matchType   = typeFilter === 'all' || d.storeType === typeFilter;
      const matchPromo  = promoFilter === 'all' ||
        (promoFilter === 'promo' && d.promo === 1) ||
        (promoFilter === 'no-promo' && d.promo === 0);
      return matchSearch && matchType && matchPromo;
    })
    .slice(0, topN);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-5">
        {/* Search */}
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search store..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="filter-select pl-7 w-36"
          />
        </div>

        {/* Type filter */}
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="filter-select">
          <option value="all">All Types</option>
          <option value="Type A">Type A</option>
          <option value="Type B">Type B</option>
          <option value="Type C">Type C</option>
          <option value="Type D">Type D</option>
        </select>

        {/* Promo filter */}
        <select value={promoFilter} onChange={e => setPromoFilter(e.target.value)} className="filter-select">
          <option value="all">All Promo</option>
          <option value="promo">Promo Active</option>
          <option value="no-promo">No Promo</option>
        </select>

        {/* Top N */}
        <select value={topN} onChange={e => setTopN(Number(e.target.value))} className="filter-select">
          <option value={5}>Top 5</option>
          <option value={10}>Top 10</option>
          <option value={15}>Top 15</option>
          <option value={20}>Top 20</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          data={filtered}
          layout="vertical"
          margin={{ top: 5, right: 80, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false} tickLine={false}
            tickFormatter={(v) => `€${v.toLocaleString()}`}
          />
          <YAxis
            type="category"
            dataKey="store"
            tick={{ fill: '#cbd5e1', fontSize: 11 }}
            axisLine={false} tickLine={false}
            width={90}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff06' }} />
          <Bar dataKey="predictedSales" name="Predicted Sales" radius={[0, 6, 6, 0]} maxBarSize={28}>
            {filtered.map((entry) => (
              <Cell
                key={entry.store}
                fill={TYPE_COLORS[entry.storeType] ?? '#3b82f6'}
                fillOpacity={entry.promo ? 1 : 0.6}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-3 justify-center">
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <span key={type} className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: color }} />
            {type}
          </span>
        ))}
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className="w-3 h-3 rounded-sm inline-block bg-slate-500 opacity-60" />
          No Promo (dimmed)
        </span>
      </div>
    </div>
  );
}
