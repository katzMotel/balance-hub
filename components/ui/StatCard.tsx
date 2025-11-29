import { ReactNode } from 'react';
import { Card } from './Card';
import { formatCurrency } from '@/lib/utils/format';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  change?: number;
  icon?: ReactNode;
}

export function StatCard({ title, value, change, icon }: StatCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(value)}
          </p>
          
          {change !== undefined && (
            <div className="mt-2 flex items-center text-sm">
              {isPositive && <TrendingUp className="mr-1 h-4 w-4 text-green-600" />}
              {isNegative && <TrendingDown className="mr-1 h-4 w-4 text-red-600" />}
              <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                {formatCurrency(change, true)}
              </span>
              <span className="ml-1 text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="rounded-lg bg-blue-100 dark:bg-blue-900 p-3 text-blue-600">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}