// components/Navbar.tsx
'use client';

import { useState } from 'react';
import {
  BarChart2, Store, TrendingUp, Calendar, MapPin, Menu, X,
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { label: 'Overview',    href: '#overview',     icon: <BarChart2 size={15} /> },
  { label: 'Store Intel', href: '#store-intel',  icon: <Store size={15} />     },
  { label: 'Promotions',  href: '#promotions',   icon: <TrendingUp size={15} />},
  { label: 'Operations',  href: '#operations',   icon: <Calendar size={15} />  },
  { label: 'Competition', href: '#competition',  icon: <MapPin size={15} />    },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <BarChart2 size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">Rossmann Analytics</p>
              <p className="text-[10px] text-slate-400 leading-tight">Retail Intelligence Platform</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-400
                           hover:text-white hover:bg-slate-700/60 transition-all duration-150"
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>

          {/* Badge */}
          <div className="hidden md:flex items-center gap-2">
            <span className="badge bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Live Data
            </span>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-3 border-t border-slate-700 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300
                           hover:text-white hover:bg-slate-700 transition-all"
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
