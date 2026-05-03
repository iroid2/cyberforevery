import { Bell, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DashboardHeaderProps {
  userName?: string
  date?: string
  onExport?: () => void
}

export function DashboardHeader({
  userName = 'Sajibur Rahman',
  date = 'Sun, 12 June 2026',
  onExport,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 py-4 gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 truncate">Welcome back {userName}</h1>
            <p className="hidden sm:block text-sm text-slate-600 truncate">
              Monitor and control what happens with your money today for financial health.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{date}</p>
            </div>
          </div>

          {onExport && (
            <Button
              onClick={onExport}
              className="bg-slate-900 text-white hover:bg-slate-800 text-sm px-3 md:px-4"
            >
              Export
            </Button>
          )}

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Bell className="h-5 w-5 text-slate-600" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
