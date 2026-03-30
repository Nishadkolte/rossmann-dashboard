// ============================================================
// utils/helpers.ts
// Shared formatting & helper utilities used across components.
// ============================================================

/**
 * Format a number with thousands separators.
 * e.g. 41088 → "41,088"
 */
export function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

/**
 * Format a number as a percentage string.
 * e.g. 85.4 → "85.4%"
 */
export function formatPct(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`;
}

/**
 * Format meters to a human-readable distance.
 * e.g. 5404.9 → "5.4 km"
 */
export function formatDistance(meters: number): string {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`;
  return `${Math.round(meters)} m`;
}

/**
 * Return a Tailwind text-color class based on a
 * percentage value (used for KPI colouring).
 */
export function pctColor(val: number, threshold = 50): string {
  return val >= threshold ? 'text-emerald-400' : 'text-amber-400';
}

/**
 * Clamp a value between min and max.
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

/**
 * Build a custom Recharts tooltip style object.
 */
export const tooltipStyle = {
  backgroundColor: '#1e293b',
  border: '1px solid #334155',
  borderRadius: '8px',
  color: '#f1f5f9',
  fontSize: 13,
};
