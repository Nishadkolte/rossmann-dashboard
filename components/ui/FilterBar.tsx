// components/ui/FilterBar.tsx
'use client';

interface FilterBarProps {
  storeTypeFilter: string;
  setStoreTypeFilter: (val: string) => void;
  assortmentFilter: string;
  setAssortmentFilter: (val: string) => void;
  promo2Filter: string;
  setPromo2Filter: (val: string) => void;
}

export default function FilterBar({
  storeTypeFilter, setStoreTypeFilter,
  assortmentFilter, setAssortmentFilter,
  promo2Filter, setPromo2Filter,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center p-4 bg-slate-800 border border-slate-700 rounded-2xl">
      {/* Label */}
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
        Filters:
      </span>

      {/* Store Type */}
      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-400">Store Type</label>
        <select
          value={storeTypeFilter}
          onChange={e => setStoreTypeFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="a">Type A</option>
          <option value="b">Type B</option>
          <option value="c">Type C</option>
          <option value="d">Type D</option>
        </select>
      </div>

      {/* Assortment */}
      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-400">Assortment</label>
        <select
          value={assortmentFilter}
          onChange={e => setAssortmentFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Levels</option>
          <option value="a">Basic (a)</option>
          <option value="b">Extra (b)</option>
          <option value="c">Extended (c)</option>
        </select>
      </div>

      {/* Promo2 */}
      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-400">Promo2</label>
        <select
          value={promo2Filter}
          onChange={e => setPromo2Filter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All</option>
          <option value="enrolled">Enrolled</option>
          <option value="not-enrolled">Not Enrolled</option>
        </select>
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          setStoreTypeFilter('all');
          setAssortmentFilter('all');
          setPromo2Filter('all');
        }}
        className="btn-ghost ml-auto text-xs py-1.5 px-3"
      >
        Reset Filters
      </button>
    </div>
  );
}
