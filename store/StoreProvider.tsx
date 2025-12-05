'use client';
import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { loadState, saveState } from '@/lib/utils/localStorage';
import { restoreAccounts } from './slices/accountsSlice';
import { restoreTransactions } from './slices/transactionsSlice';
import { restoreBudgets } from './slices/budgetsSlice';
import { restoreInvestments } from './slices/investmentsSlice';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    console.log('StoreProvider mounted');
    
    // Load and restore persisted state once on mount
    if (!initialized.current) {
      const persistedState = loadState();
      console.log('Loaded state:', persistedState);
      
      if (persistedState) {
        if (persistedState.accounts?.accounts) {
          console.log('Accounts to restore: ', persistedState.accounts?.accounts);
          store.dispatch(restoreAccounts(persistedState.accounts.accounts));
        }
        if (persistedState.transactions?.transactions) {
          console.log('Transactions to restore: ', persistedState.transactions?.transactions);
          store.dispatch(restoreTransactions(persistedState.transactions.transactions));
        }
        if (persistedState.budgets?.budgets) {
          console.log('Budgets to restore: ', persistedState.budgets?.budgets)
          store.dispatch(restoreBudgets(persistedState.budgets.budgets));
        }
        if (persistedState.investments?.investments) {
          console.log('Investments to restore: ', persistedState.investments?.investments);
          store.dispatch(restoreInvestments(persistedState.investments.investments));
        }
      }
      initialized.current = true;
    }

    // Subscribe to store changes
    const unsubscribe = store.subscribe(() => {
      console.log('Store changed, saving...');
      saveState(store.getState());
    });

    return () => unsubscribe();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}