'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  selectTotalBalance, 
  fetchAccounts 
} from '@/store/slices/accountsSlice';
import {
  selectTotalIncome,
  selectTotalExpenses,
  selectRecentTransactions,
  fetchTransactions,
} from '@/store/slices/transactionsSlice';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  
  const totalBalance = useAppSelector(selectTotalBalance);
  const totalIncome = useAppSelector(selectTotalIncome);
  const totalExpenses = useAppSelector(selectTotalExpenses);
  const recentTransactions = useAppSelector(selectRecentTransactions);

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const savingsRate = totalIncome > 0 
    ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Here's your financial overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Balance"
          value={totalBalance}
          icon={<Wallet className="h-6 w-6" />}
        />
        <StatCard
          title="Total Income"
          value={totalIncome}
          change={350}
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <StatCard
          title="Total Expenses"
          value={totalExpenses}
          change={-125}
          icon={<TrendingDown className="h-6 w-6" />}
        />
        <StatCard
          title="Savings Rate"
          value={Number(savingsRate)}
          icon={<PiggyBank className="h-6 w-6" />}
        />
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {transaction.description}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(transaction.date)} • {transaction.category}
                </p>
              </div>
              <span
                className={`font-semibold ${
                  transaction.type === 'income'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {formatCurrency(transaction.amount, true)}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}