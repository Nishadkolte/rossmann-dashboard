// components/ui/SectionHeader.tsx
import { type ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export default function SectionHeader({ title, description, icon }: SectionHeaderProps) {
  return (
    <div className="flex items-start gap-3 mb-6">
      {icon && (
        <div className="mt-0.5 p-2 bg-blue-500/10 rounded-lg text-blue-400">
          {icon}
        </div>
      )}
      <div>
        <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
        {description && (
          <p className="text-sm text-slate-400 mt-0.5">{description}</p>
        )}
      </div>
    </div>
  );
}
