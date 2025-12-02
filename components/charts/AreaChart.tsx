'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data - you'll replace this with real transaction data later
const data = [
  { month: 'Jan', income: 4000, expenses: 2400 },
  { month: 'Feb', income: 3000, expenses: 1398 },
  { month: 'Mar', income: 2000, expenses: 1800 },
  { month: 'Apr', income: 2780, expenses: 3908 },
  { month: 'May', income: 1890, expenses: 4800 },
  { month: 'Jun', income: 2390, expenses: 3800 },
];

export default function FinanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis 
          dataKey="month" 
          className="text-gray-600 dark:text-gray-400"
        />
        <YAxis 
          className="text-gray-600 dark:text-gray-400"
        />
        <Tooltip 
          contentStyle={{
          backgroundColor: 'var(--color-gray-800)', // Dark background
          border: 'none',
          borderRadius: '0.5rem',
          color: 'var(--color-white)', // Add this for text color
          }}
          labelStyle={{ 
          color: 'var(--color-gray-300)' // Label text color
          }}
          itemStyle={{
          color: 'var(--color-white)' // Item text color - add this!
          }}
        />
        <Area 
          type="monotone" 
          dataKey="income" 
          stackId="1" 
          stroke="rgb(var(--color-success-500))" 
          fill="rgb(var(--color-success-500))" 
          fillOpacity={0.6}
        />
        <Area 
          type="monotone" 
          dataKey="expenses" 
          stackId="1" 
          stroke="rgb(var(--color-danger-500))" 
          fill="rgb(var(--color-danger-500))" 
          fillOpacity={0.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}