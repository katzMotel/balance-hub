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
  sortBy: 'date' | 'amount' | 'description';
  sortOrder: 'asc' | 'desc';
  searchQuery: string;
}

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  filters: {},
  sortBy: 'date',
  sortOrder: 'desc',
  searchQuery: '',
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
export const addTransaction = createAsyncThunk(
    'transactions/addTransaction',
    async (newTransaction: Omit<Transaction, 'id' | 'createdAt'>) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        ...newTransaction,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      };
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
    setSortBy: (state, action: PayloadAction<'date' | 'amount' | 'description'>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    editTransaction: (state, action: PayloadAction<{id: string; changes: Partial<Transaction>}>) => {
        const index = state.transactions.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
            state.transactions[index] = {...state.transactions[index], ...action.payload.changes};
        }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },
    restoreTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        if(state.transactions.length === 0){
          state.loading = false;
          state.transactions = action.payload;
        } else{
          state.loading = false;
        }
        
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      });   
  },
});

// Export actions
export const { restoreTransactions, setFilter, clearFilters, setSortBy, setSortOrder, setSearchQuery, editTransaction, deleteTransaction } = transactionsSlice.actions;

// Selectors
export const selectFilteredTransactions = (state: RootState) => {
  let filtered = state.transactions.transactions;
  
  // Apply filters
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
  
  // Apply search
  if (state.transactions.searchQuery) {
    const query = state.transactions.searchQuery.toLowerCase();
    filtered = filtered.filter(t => 
      t.description.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query)
    );
  }
  
  // Apply sorting
  const sorted = [...filtered].sort((a, b) => {
    let comparison = 0;
    
    if (state.transactions.sortBy === 'date') {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (state.transactions.sortBy === 'amount') {
      comparison = Math.abs(a.amount) - Math.abs(b.amount);
    } else if (state.transactions.sortBy === 'description') {
      comparison = a.description.localeCompare(b.description);
    }
    
    return state.transactions.sortOrder === 'asc' ? comparison : -comparison;
  });
  
  return sorted;
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