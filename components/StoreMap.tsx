// components/charts/StoreMap.tsx
// ── Leaflet map of all 1,115 Rossmann stores across Germany ──
// Uses react-leaflet (no API key needed — OpenStreetMap tiles)
// Colour modes: Store Type / Promo2 Status / Competition Distance
'use client';

import { useEffect, useState, useMemo } from 'react';
import { MapPin } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────
interface StoreGeoPoint {
  id: number; lat: number; lon: number;
  storeType: string; assortment: string;
  promo2: number; compDist: number;
  city: string; region: string;
}

type ColourMode = 'storeType' | 'promo2' | 'compDist';

// ── Colour helpers ────────────────────────────────────────────
const TYPE_COLORS: Record<string, string> = {
  a: '#3b82f6',   // blue
  b: '#f59e0b',   // amber
  c: '#06b6d4',   // cyan
  d: '#8b5cf6',   // purple
};

const PROMO2_COLORS: Record<number, string> = {
  1: '#10b981',   // emerald — enrolled
  0: '#ef4444',   // red — not enrolled
};

function compDistColor(dist: number): string {
  if (dist < 500)   return '#ef4444';   // red — very close
  if (dist < 1000)  return '#f97316';   // orange
  if (dist < 2000)  return '#f59e0b';   // amber
  if (dist < 5000)  return '#10b981';   // green
  if (dist < 10000) return '#3b82f6';   // blue
  return '#8b5cf6';                     // purple — very far
}

function getColor(store: StoreGeoPoint, mode: ColourMode): string {
  if (mode === 'storeType') return TYPE_COLORS[store.storeType] ?? '#94a3b8';
  if (mode === 'promo2')    return PROMO2_COLORS[store.promo2]  ?? '#94a3b8';
  return compDistColor(store.compDist);
}

// ── Legend configs ────────────────────────────────────────────
const LEGENDS: Record<ColourMode, { label: string; color: string }[]> = {
  storeType: [
    { label: 'Type A — Hypermarket',   color: '#3b82f6' },
    { label: 'Type B — Convenience',   color: '#f59e0b' },
    { label: 'Type C — Drug/Health',   color: '#06b6d4' },
    { label: 'Type D — Department',    color: '#8b5cf6' },
  ],
  promo2: [
    { label: 'Enrolled in Promo2',     color: '#10b981' },
    { label: 'Not Enrolled',           color: '#ef4444' },
  ],
  compDist: [
    { label: '< 500 m  (High pressure)', color: '#ef4444' },
    { label: '500 m – 1 km',             color: '#f97316' },
    { label: '1 – 2 km',                 color: '#f59e0b' },
    { label: '2 – 5 km',                 color: '#10b981' },
    { label: '5 – 10 km',               color: '#3b82f6' },
    { label: '> 10 km  (Low pressure)', color: '#8b5cf6' },
  ],
};

// ── Stats helper ──────────────────────────────────────────────
function MapStats({ stores, mode }: { stores: StoreGeoPoint[]; mode: ColourMode }) {
  const stats = useMemo(() => {
    if (mode === 'storeType') {
      return Object.entries(TYPE_COLORS).map(([t, c]) => ({
        label: `Type ${t.toUpperCase()}`,
        count: stores.filter(s => s.storeType === t).length,
        color: c,
      }));
    }
    if (mode === 'promo2') {
      return [
        { label: 'Enrolled',     count: stores.filter(s => s.promo2 === 1).length, color: '#10b981' },
        { label: 'Not Enrolled', count: stores.filter(s => s.promo2 === 0).length, color: '#ef4444' },
      ];
    }
    return [
      { label: '< 500 m',   count: stores.filter(s => s.compDist < 500).length,                              color: '#ef4444' },
      { label: '500m–2km',  count: stores.filter(s => s.compDist >= 500  && s.compDist < 2000).length,       color: '#f59e0b' },
      { label: '2–10 km',   count: stores.filter(s => s.compDist >= 2000 && s.compDist < 10000).length,      color: '#10b981' },
      { label: '> 10 km',   count: stores.filter(s => s.compDist >= 10000).length,                           color: '#8b5cf6' },
    ];
  }, [stores, mode]);

  return (
    <div className="flex flex-wrap gap-3">
      {stats.map(s => (
        <div key={s.label} className="flex items-center gap-2 bg-slate-700/50 rounded-lg px-3 py-1.5">
          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
          <span className="text-xs text-slate-300 font-medium">{s.label}</span>
          <span className="text-xs text-slate-400">{s.count.toLocaleString()}</span>
        </div>
      ))}
      <div className="flex items-center gap-2 bg-slate-700/50 rounded-lg px-3 py-1.5">
        <MapPin size={12} className="text-slate-400" />
        <span className="text-xs text-slate-300 font-medium">Total</span>
        <span className="text-xs text-blue-400 font-bold">{stores.length.toLocaleString()}</span>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
interface Props {
  stores: StoreGeoPoint[];
}

export default function StoreMap({ stores }: Props) {
  const [colourMode, setColourMode]   = useState<ColourMode>('storeType');
  const [typeFilter, setTypeFilter]   = useState('all');
  const [promo2Filter, setPromo2Filter] = useState('all');
  const [MapComponents, setMapComponents] = useState<{
    MapContainer: typeof import('react-leaflet')['MapContainer'];
    TileLayer:    typeof import('react-leaflet')['TileLayer'];
    CircleMarker: typeof import('react-leaflet')['CircleMarker'];
    Popup:        typeof import('react-leaflet')['Popup'];
    ZoomControl:  typeof import('react-leaflet')['ZoomControl'];
  } | null>(null);

  // Dynamically import Leaflet (SSR-safe)
  useEffect(() => {
    Promise.all([
      import('react-leaflet'),
      import('leaflet/dist/leaflet.css' as string),
    ]).then(([rl]) => {
      setMapComponents({
        MapContainer: rl.MapContainer,
        TileLayer:    rl.TileLayer,
        CircleMarker: rl.CircleMarker,
        Popup:        rl.Popup,
        ZoomControl:  rl.ZoomControl,
      });
    }).catch(() => {
      // Try without CSS import
      import('react-leaflet').then((rl) => {
        setMapComponents({
          MapContainer: rl.MapContainer,
          TileLayer:    rl.TileLayer,
          CircleMarker: rl.CircleMarker,
          Popup:        rl.Popup,
          ZoomControl:  rl.ZoomControl,
        });
      });
    });
  }, []);

  // Filter stores
  const filtered = useMemo(() => {
    return stores.filter(s => {
      const matchType  = typeFilter   === 'all' || s.storeType === typeFilter;
      const matchPromo = promo2Filter === 'all' ||
        (promo2Filter === '1' && s.promo2 === 1) ||
        (promo2Filter === '0' && s.promo2 === 0);
      return matchType && matchPromo;
    });
  }, [stores, typeFilter, promo2Filter]);

  return (
    <div className="flex flex-col gap-4">
      {/* ── Controls ── */}
      <div className="flex flex-wrap gap-3 items-center">

        {/* Colour mode */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Colour by:</span>
          <div className="flex rounded-lg overflow-hidden border border-slate-600">
            {([
              ['storeType', 'Store Type'],
              ['promo2',    'Promo2'],
              ['compDist',  'Competition'],
            ] as [ColourMode, string][]).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setColourMode(val)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors duration-150
                  ${colourMode === val
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Type filter */}
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="filter-select text-xs"
        >
          <option value="all">All Types</option>
          <option value="a">Type A</option>
          <option value="b">Type B</option>
          <option value="c">Type C</option>
          <option value="d">Type D</option>
        </select>

        {/* Promo2 filter */}
        <select
          value={promo2Filter}
          onChange={e => setPromo2Filter(e.target.value)}
          className="filter-select text-xs"
        >
          <option value="all">All Promo2</option>
          <option value="1">Enrolled</option>
          <option value="0">Not Enrolled</option>
        </select>

        {/* Reset */}
        <button
          onClick={() => { setTypeFilter('all'); setPromo2Filter('all'); setColourMode('storeType'); }}
          className="btn-ghost text-xs py-1.5 px-3"
        >
          Reset
        </button>
      </div>

      {/* ── Stats row ── */}
      <MapStats stores={filtered} mode={colourMode} />

      {/* ── Map ── */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl"
           style={{ height: '520px' }}>
        {MapComponents ? (
          <MapComponents.MapContainer
            center={[51.1657, 10.4515]}
            zoom={6}
            style={{ height: '100%', width: '100%', background: '#0f172a' }}
            zoomControl={false}
          >
            {/* Dark tile layer */}
            <MapComponents.TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              maxZoom={19}
            />
            <MapComponents.ZoomControl position="bottomright" />

            {/* Store markers */}
            {filtered.map((store) => (
              <MapComponents.CircleMarker
                key={store.id}
                center={[store.lat, store.lon]}
                radius={5}
                pathOptions={{
                  color:       getColor(store, colourMode),
                  fillColor:   getColor(store, colourMode),
                  fillOpacity: 0.85,
                  weight:      1,
                  opacity:     0.9,
                }}
              >
                <MapComponents.Popup>
                  <div style={{
                    background: '#1e293b', color: '#f1f5f9',
                    borderRadius: 8, padding: '10px 14px',
                    fontSize: 12, minWidth: 180,
                    border: '1px solid #334155',
                  }}>
                    <p style={{ fontWeight: 700, marginBottom: 6, fontSize: 13 }}>
                      🏪 Store {store.id}
                    </p>
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                      <tbody>
                        {[
                          ['Type',        `Type ${store.storeType.toUpperCase()}`],
                          ['Assortment',  store.assortment.toUpperCase()],
                          ['Promo2',      store.promo2 ? '✅ Enrolled' : '❌ Not enrolled'],
                          ['Comp. Dist',  store.compDist >= 1000
                            ? `${(store.compDist/1000).toFixed(1)} km`
                            : `${store.compDist} m`],
                          ['City',        store.city],
                          ['Region',      store.region],
                        ].map(([k, v]) => (
                          <tr key={k}>
                            <td style={{ color: '#94a3b8', paddingRight: 8, paddingBottom: 3 }}>{k}</td>
                            <td style={{ color: '#f1f5f9', fontWeight: 500, paddingBottom: 3 }}>{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{
                      marginTop: 8, paddingTop: 8,
                      borderTop: '1px solid #334155',
                      fontSize: 10, color: '#64748b',
                    }}>
                      Coordinates: {store.lat.toFixed(4)}, {store.lon.toFixed(4)}
                    </div>
                  </div>
                </MapComponents.Popup>
              </MapComponents.CircleMarker>
            ))}
          </MapComponents.MapContainer>
        ) : (
          // Loading state
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-400 text-sm">Loading map...</p>
          </div>
        )}

        {/* Legend overlay */}
        <div className="absolute bottom-10 left-3 z-[1000] bg-slate-900/90 backdrop-blur-sm
                        border border-slate-700 rounded-xl p-3 shadow-xl">
          <p className="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
            {colourMode === 'storeType' ? 'Store Type' :
             colourMode === 'promo2'    ? 'Promo2 Status' : 'Competition Distance'}
          </p>
          {LEGENDS[colourMode].map(item => (
            <div key={item.label} className="flex items-center gap-2 mb-1.5">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-slate-400">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Store count badge */}
        <div className="absolute top-3 right-3 z-[1000] bg-slate-900/90 backdrop-blur-sm
                        border border-slate-700 rounded-xl px-3 py-2 shadow-xl">
          <p className="text-xs text-slate-400">Showing</p>
          <p className="text-lg font-bold text-blue-400">{filtered.length.toLocaleString()}</p>
          <p className="text-xs text-slate-400">stores</p>
        </div>
      </div>

      {/* Note */}
      <p className="text-xs text-slate-600 text-center">
        📍 Store coordinates are approximated based on real German city distributions.
        Click any marker for store details.
      </p>
    </div>
  );
}
