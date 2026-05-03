import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  amount: string | number
  currency?: string
  icon: React.ReactNode
  trend?: 'up' | 'down'
  trendPercent?: string | number
  trendLabel?: string
  className?: string
}

export function StatsCard({
  title,
  amount,
  currency = 'USD',
  icon,
  trend,
  trendPercent,
  trendLabel = 'from last month',
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-900">${amount}</span>
            <span className="text-sm text-slate-600">{currency}</span>
          </p>
          {trend && trendPercent !== undefined && (
            <div className="mt-3 flex items-center gap-1">
              <div
                className={cn(
                  'flex items-center gap-0.5 text-xs font-medium',
                  trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                )}
              >
                {trend === 'up' ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>
                  {trend === 'up' ? '+' : '-'}
                  {trendPercent}%
                </span>
              </div>
              <span className="text-xs text-slate-600">{trendLabel}</span>
            </div>
          )}
        </div>
        <div className="rounded-lg bg-primary/10 p-3 text-primary">{icon}</div>
      </div>
    </div>
  )
}
