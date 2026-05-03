import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface UpgradeCardProps {
  title: string
  description: string
  buttonText?: string
  icon?: React.ReactNode
  className?: string
  onUpgrade?: () => void
}

export function UpgradeCard({
  title,
  description,
  buttonText = 'Upgrade',
  icon = <Star className="h-5 w-5" />,
  className,
  onUpgrade,
}: UpgradeCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-emerald-50 border-emerald-200 p-4 shadow-sm hover:shadow-md transition-shadow',
        className
      )}
    >
      <div className="mb-3 flex items-start gap-2">
        <div className="rounded-md bg-emerald-100 p-2 text-emerald-700 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-slate-900">{title}</h3>
          <p className="mt-0.5 text-xs text-slate-700 leading-snug">
            {description}
          </p>
        </div>
      </div>

      <Button
        onClick={onUpgrade}
        className="w-full bg-emerald-600 text-white hover:bg-emerald-700 text-sm h-9"
        size="sm"
      >
        {buttonText}
      </Button>
    </div>
  )
}
