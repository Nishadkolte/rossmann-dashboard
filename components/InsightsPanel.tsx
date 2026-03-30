// components/InsightsPanel.tsx
import { Lightbulb, AlertTriangle, TrendingUp, Target } from 'lucide-react';

const insights = [
  {
    icon: <TrendingUp size={16} />,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    title: 'Type A stores dominate the network',
    body:
      '54% of all Rossmann locations are Type A (hypermarket format), making them the primary driver of network-wide sales and promotional activity.',
  },
  {
    icon: <Target size={16} />,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    title: 'Promo2 adoption is near 50/50',
    body:
      '51.2% of stores participate in the rolling Promo2 programme. Type D stores show the highest adoption (58%), while Type B lags at 29%.',
  },
  {
    icon: <AlertTriangle size={16} />,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    title: 'Sunday closures drive sharp dips',
    body:
      'Open-store count drops from ~856 on weekdays to just 27 on Sundays — confirming German retail trading laws. Holiday dates (e.g., Aug 15) also show partial closures.',
  },
  {
    icon: <Lightbulb size={16} />,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    title: 'Competition clusters in the 2–5 km band',
    body:
      'The most common nearest-competitor distance is 2–5 km (261 stores), suggesting moderate urban density. Type B stores face the closest competition at an average of just 1.1 km.',
  },
];

export default function InsightsPanel() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
        <Lightbulb size={18} className="text-amber-400" />
        Key Insights
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {insights.map((ins) => (
          <div
            key={ins.title}
            className={`card border ${ins.bg} animate-fade-in`}
          >
            <div className={`flex items-center gap-2 mb-2 ${ins.color}`}>
              {ins.icon}
              <p className="text-sm font-semibold">{ins.title}</p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{ins.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
