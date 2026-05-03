'use client';

import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SavingsPlanCardProps {
  title: string;
  current: number;
  target: number;
  percentage: number;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning';
  className?: string;
}

const variantConfig = {
  default: {
    bgColor: 'bg-blue-50',
    barColor: 'bg-blue-500',
    textColor: 'text-blue-700',
  },
  success: {
    bgColor: 'bg-emerald-50',
    barColor: 'bg-emerald-500',
    textColor: 'text-emerald-700',
  },
  warning: {
    bgColor: 'bg-amber-50',
    barColor: 'bg-amber-500',
    textColor: 'text-amber-700',
  },
};

export function SavingsPlanCard({
  title,
  current,
  target,
  percentage,
  icon,
  variant = 'default',
  className,
}: SavingsPlanCardProps) {
  const config = variantConfig[variant];

  return (
    <div
      className={cn(
        'rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow',
        className
      )}
    >
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4 text-slate-400" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className={cn('text-2xl font-bold', config.textColor)}>
              ${current.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              of ${target.toLocaleString()}
            </p>
          </div>
          <div className={cn('text-right px-3 py-1.5 rounded-md', config.bgColor)}>
            <p className={cn('text-lg font-bold', config.textColor)}>
              {percentage}%
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={cn('h-full transition-all duration-500', config.barColor)}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-xs text-slate-500">
            {Math.round(((target - current) / target) * 100)}% remaining
          </p>
        </div>
      </div>
    </div>
  );
}
