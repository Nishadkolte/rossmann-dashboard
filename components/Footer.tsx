// components/Footer.tsx
import { Github, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div>
            <p className="font-bold text-white text-sm">Rossmann Retail Intelligence Dashboard</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Built with Next.js · Tailwind CSS · Recharts · TypeScript
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <a
              href="https://www.kaggle.com/c/rossmann-store-sales"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <ExternalLink size={13} /> Kaggle Dataset
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Github size={13} /> GitHub
            </a>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <ExternalLink size={13} /> Deploy on Vercel
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-800 text-center text-xs text-slate-600">
          Dataset sourced from the Rossmann Store Sales Kaggle competition (2015). 
          For educational and portfolio purposes only.
        </div>
      </div>
    </footer>
  );
}
