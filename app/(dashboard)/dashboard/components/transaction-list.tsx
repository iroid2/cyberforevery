'use client';

import { MoreVertical, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TransactionItem {
  id: string;
  activity: string;
  icon?: React.ReactNode;
  date: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
}

interface TransactionListProps {
  title: string;
  transactions: TransactionItem[];
  onFilter?: () => void;
}

const statusConfig = {
  success: {
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    badgeColor: 'bg-emerald-100',
  },
  pending: {
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    badgeColor: 'bg-yellow-100',
  },
  failed: {
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    badgeColor: 'bg-red-100',
  },
};

export function TransactionList({
  title,
  transactions,
  onFilter,
}: TransactionListProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {onFilter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onFilter}
            className="text-xs text-slate-600 hover:text-slate-900"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">
                Activity
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">
                Date
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">
                Price
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => {
              const statusStyle = statusConfig[txn.status];
              return (
                <tr
                  key={txn.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm font-medium text-slate-900">
                    <div className="flex items-center gap-3">
                      {txn.icon && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                          {txn.icon}
                        </div>
                      )}
                      <span>{txn.activity}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {new Date(txn.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    })}
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-semibold text-slate-900">
                    ${txn.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Badge
                      className={cn(
                        'capitalize',
                        statusStyle.badgeColor,
                        statusStyle.textColor
                      )}
                      variant="secondary"
                    >
                      {txn.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4 text-slate-400" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
