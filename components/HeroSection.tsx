// components/HeroSection.tsx
import { Database, GitBranch, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden border-b border-slate-700/50 bg-gradient-to-b from-slate-900 to-slate-900/80">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-blue-600/10 blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20
                        rounded-full px-4 py-1.5 text-xs font-medium text-blue-400 mb-6">
          <Zap size={12} />
          Rossmann Kaggle Competition · Store Sales Forecast
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent
                       bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-4">
          Retail Intelligence
          <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {' '}Dashboard
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base text-slate-400 leading-relaxed mb-8">
          End-to-end exploratory analysis of{' '}
          <span className="text-slate-200 font-semibold">1,115 Rossmann stores</span> across Germany — 
          uncovering promotional strategies, competitive positioning, and operational patterns 
          to drive data-informed retail decisions.
        </p>

        {/* Meta pills */}
        <div className="flex flex-wrap justify-center gap-3 text-xs">
          {[
            { icon: <Database size={12} />, label: '1,115 Stores' },
            { icon: <GitBranch size={12} />, label: '41,088 Test Records' },
            { icon: <Zap size={12} />,      label: 'Aug – Sep 2015' },
          ].map((p) => (
            <span
              key={p.label}
              className="flex items-center gap-1.5 bg-slate-800 border border-slate-700
                         px-3 py-1.5 rounded-full text-slate-300"
            >
              {p.icon} {p.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
