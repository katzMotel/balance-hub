'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  fetchTransactions,
  selectFilteredTransactions,
} from '@/store/slices/transactionsSlice';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { TransactionFilters } from '@/components/features/transactions/TransactionFilters';
import { formatCurrency, formatDate } from '@/lib/utils/format';

export default function TransactionsPage() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectFilteredTransactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Transactions
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          View and filter your transactions
        </p>
      </div>

      {/* Filters */}
      <TransactionFilters />

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No transactions found
            </p>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(transaction.date)} • {transaction.category}
                    </p>
                  </div>
                  <span
                    className={`font-semibold ${
                      transaction.type === 'income'
                        ? 'text-success-600 dark:text-success-400'
                        : 'text-danger-600 dark:text-danger-400'
                    }`}
                  >
                    {formatCurrency(transaction.amount, true)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}