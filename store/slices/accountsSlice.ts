import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Account } from '@/types/types.index';

// State shape for this slice
interface AccountsState {
  accounts: Account[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AccountsState = {
  accounts: [],
  loading: false,
  error: null,
};

// Async thunk - for "fetching" accounts (we'll use mock data for now)
export const fetchAccounts = createAsyncThunk(
  'accounts/fetchAccounts',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock data
    return [
      {
        id: '1',
        name: 'Main Checking',
        type: 'checking' as const,
        balance: 5420.50,
        currency: 'USD',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Savings',
        type: 'savings' as const,
        balance: 15000,
        currency: 'USD',
        createdAt: new Date().toISOString(),
      },
    ];
  }
);

// The slice
const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    // Synchronous action - add account directly
    addAccountDirect: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload);
    },
    // Another synchronous action - delete by id
    deleteAccount: (state, action: PayloadAction<string>) => {
      state.accounts = state.accounts.filter(acc => acc.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Handle async thunk states
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch accounts';
      });
  },
});

// Export actions
export const { addAccountDirect, deleteAccount } = accountsSlice.actions;

// Selectors - functions to read from state
export const selectAllAccounts = (state: RootState) => state.accounts.accounts;
export const selectAccountsLoading = (state: RootState) => state.accounts.loading;

// Computed selector - calculates total balance
export const selectTotalBalance = (state: RootState) => {
  return state.accounts.accounts.reduce((total: number, acc: Account) => {
    return total + (acc.balance > 0 ? acc.balance : 0);
  }, 0);
};

// Export reducer

export default accountsSlice.reducer;