'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Wallet, TrendingUp, PieChart, LineChart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme, selectTheme } from '@/store/slices/uiSlice';
import { Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';
export default function LandingPage() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  useEffect(()=>{
    if( theme === 'dark'){
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },[theme]);
  return (
    
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
    <div className="absolute top-4 right-4">
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  </div>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Take Control of Your Finances
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Track expenses, manage budgets, and monitor investments all in one place
          </p>
          <div className="flex gap-4 justify-center pt-8">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              <Wallet className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Account Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track multiple accounts and see your total balance at a glance
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-success-100 dark:bg-success-900 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-success-600 dark:text-success-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Transaction Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor income and expenses with powerful filtering and search
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-warning-100 dark:bg-warning-900 rounded-lg flex items-center justify-center">
              <PieChart className="h-8 w-8 text-warning-600 dark:text-warning-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Budget Planning
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Set budgets by category and track spending automatically
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              <LineChart className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Investment Portfolio
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track stocks with real-time prices and performance metrics
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-24 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            Built with Next.js, TypeScript, and Redux Toolkit
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            © 2025 BalanceHub • Created by Dylan Giddens
          </p>
        </footer>
      </div>
    </div>
  );
}