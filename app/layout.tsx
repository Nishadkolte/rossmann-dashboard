// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import ChatBot from '@/components/ChatBot';

export const metadata: Metadata = {
  title: 'Rossmann Retail Intelligence Dashboard',
  description:
    'End-to-end retail analytics dashboard with AI forecasting, model comparison, ' +
    'interactive store map, and Claude-powered chatbot. Built with Next.js + Recharts.',
  keywords: [
    'retail analytics', 'Rossmann', 'LightGBM', 'XGBoost', 'Prophet', 'SARIMA',
    'Next.js', 'Recharts', 'data visualization', 'AI chatbot',
  ],
  authors: [{ name: 'Rossmann Analytics Team' }],
  openGraph: {
    title: 'Rossmann Retail Intelligence Dashboard',
    description: 'End-to-end retail analytics with AI forecasting & chatbot',
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
        {/* ── Floating AI Chatbot — visible on all pages ── */}
        <ChatBot />
      </body>
    </html>
  );
}
