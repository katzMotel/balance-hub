'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartDataPoint {
  date: string;
  income: number;
  expenses: number;
}

interface FinanceChartProps {
  data?: ChartDataPoint[];
}

export default function FinanceChart({ data }: FinanceChartProps) {
  // Format date for display (e.g., "2024-12-01" -> "Dec 1")
  const formatXAxis = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Fallback mock data
  const mockData: ChartDataPoint[] = [
    { date: '2024-01-01', income: 4000, expenses: 2400 },
    { date: '2024-02-01', income: 3000, expenses: 1398 },
    { date: '2024-03-01', income: 2000, expenses: 1800 },
    { date: '2024-04-01', income: 2780, expenses: 3908 },
    { date: '2024-05-01', income: 1890, expenses: 4800 },
    { date: '2024-06-01', income: 2390, expenses: 3800 },
  ];

  const chartData = data || mockData;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis 
          dataKey="date"
          tickFormatter={formatXAxis}
          className="text-gray-600 dark:text-gray-400"
        />
        <YAxis 
          className="text-gray-600 dark:text-gray-400"
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'var(--color-gray-800)',
            border: 'none',
            borderRadius: '0.5rem',
            color: 'var(--color-white)',
          }}
          labelStyle={{ 
            color: 'var(--color-gray-300)'
          }}
          itemStyle={{
            color: 'var(--color-white)'
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