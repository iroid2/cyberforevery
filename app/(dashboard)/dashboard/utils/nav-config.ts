import {
  LayoutDashboard,
  BarChart3,
  ArrowRightLeft,
  FileText,
  RotateCw,
  CreditCard,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react'

export interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  badge?: string
  isDangerous?: boolean
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const navConfig: NavGroup[] = [
  {
    label: 'MAIN MENU',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
      },
      {
        id: 'analytics',
        label: 'Analytics',
        icon: BarChart3,
        href: '/dashboard/analytics',
        badge: '26',
      },
      {
        id: 'transactions',
        label: 'Transactions',
        icon: ArrowRightLeft,
        href: '/dashboard/transactions',
      },
      {
        id: 'invoices',
        label: 'Invoices',
        icon: FileText,
        href: '/dashboard/invoices',
      },
    ],
  },
  {
    label: 'FEATURES',
    items: [
      {
        id: 'recurring',
        label: 'Recurring',
        icon: RotateCw,
        href: '/dashboard/recurring',
        badge: '16',
      },
      {
        id: 'subscriptions',
        label: 'Subscriptions',
        icon: CreditCard,
        href: '/dashboard/subscriptions',
      },
      {
        id: 'feedback',
        label: 'Feedback',
        icon: MessageSquare,
        href: '/dashboard/feedback',
      },
    ],
  },
  {
    label: 'GENERAL',
    items: [
      {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        href: '/dashboard/settings',
      },
      {
        id: 'help',
        label: 'Help Desk',
        icon: HelpCircle,
        href: '/dashboard/help',
      },
      {
        id: 'logout',
        label: 'Log out',
        icon: LogOut,
        href: '/logout',
        isDangerous: true,
      },
    ],
  },
]
