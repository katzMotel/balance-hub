import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Transaction } from '@/types/types.index';

interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
}

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: '1',
        accountId: '1',
        amount: 3500,
        type: 'income' as const,
        category: 'Salary',
        description: 'Monthly Salary',
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        accountId: '1',
        amount: -125.50,
        type: 'expense' as const,
        category: 'Groceries',
        description: 'Grocery shopping',
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        accountId: '1',
        amount: -85,
        type: 'expense' as const,
        category: 'Utilities',
        description: 'Electric bill',
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
    ];
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      });
  },
});

// Selectors
export const selectAllTransactions = (state: RootState) => 
  state.transactions.transactions;

export const selectTotalIncome = (state: RootState) =>
  state.transactions.transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

export const selectTotalExpenses = (state: RootState) =>
  state.transactions.transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

export const selectRecentTransactions = (state: RootState) =>
  [...state.transactions.transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

export default transactionsSlice.reducer;