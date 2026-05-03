import { MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface WalletCardProps {
  currency: string
  currencySymbol: string
  balance: string | number
  status: 'active' | 'inactive'
  flag?: React.ReactNode
  className?: string
}

export function WalletCard({
  currency,
  currencySymbol,
  balance,
  status,
  flag,
  className,
}: WalletCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow',
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {flag}
          <div>
            <p className="text-sm font-medium text-slate-900">{currency}</p>
            <p className={cn(
              'text-xs font-medium',
              status === 'active'
                ? 'text-emerald-600'
                : 'text-slate-400'
            )}>
              {status === 'active' ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
        >
          <MoreVertical className="h-4 w-4 text-slate-400" />
        </Button>
      </div>
      <p className="text-2xl font-bold text-slate-900">
        {currencySymbol}
        {balance}
      </p>
    </div>
  )
}
