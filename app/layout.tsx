// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rossmann Retail Intelligence Dashboard',
  description:
    'An end-to-end analytics dashboard exploring Rossmann store attributes, ' +
    'promotional strategies, competition landscape, and operational patterns ' +
    'across 1,115 stores in Germany (Aug–Sep 2015 forecast period).',
  keywords: [
    'retail analytics',
    'Rossmann',
    'sales dashboard',
    'Next.js',
    'Recharts',
    'data visualization',
  ],
  authors: [{ name: 'Rossmann Analytics Team' }],
  openGraph: {
    title: 'Rossmann Retail Intelligence Dashboard',
    description: 'End-to-end retail analytics built with Next.js + Recharts',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
