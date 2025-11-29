import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Transaction } from '@/types/types.index';

interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  filters: {
    category?: string;
    type?: 'income' | 'expense';
    accountId?: string;
    dateRange?: { start: string; end: string };
  };
}

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  filters: {},
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
  reducers: {
    setFilter: (state, action: PayloadAction<{ key: string; value: any }>) => {
      state.filters = {
        ...state.filters,
        [action.payload.key]: action.payload.value,
      };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
  },
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

// Export actions
export const { setFilter, clearFilters } = transactionsSlice.actions;

// Selectors
export const selectAllTransactions = (state: RootState) => 
  state.transactions.transactions;

export const selectFilteredTransactions = (state: RootState) => {
  let filtered = state.transactions.transactions;
  
  if (state.transactions.filters.category) {
    filtered = filtered.filter(t => t.category === state.transactions.filters.category);
  }
  if (state.transactions.filters.type) {
    filtered = filtered.filter(t => t.type === state.transactions.filters.type);
  }
  if (state.transactions.filters.accountId) {
    filtered = filtered.filter(t => t.accountId === state.transactions.filters.accountId);
  }
  if (state.transactions.filters.dateRange) {
    const { start, end } = state.transactions.filters.dateRange;
    filtered = filtered.filter(t => {
      const date = new Date(t.date).getTime();
      return date >= new Date(start).getTime() && date <= new Date(end).getTime();
    });
  }
  
  return filtered;
};

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