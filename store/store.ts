import { configureStore } from "@reduxjs/toolkit";  
import accountsReducer from "./slices/accountsSlice";
import uiReducer from "./slices/uiSlice";
import transactionsReducer from "./slices/transactionsSlice";
import budgetsReducer from "./slices/budgetsSlice";
import investmentsReducer from "./slices/investmentsSlice";
export const store = configureStore({
    reducer: {
        // Add your reducers here
        accounts: accountsReducer,
        ui: uiReducer,
        transactions: transactionsReducer,
        budgets: budgetsReducer,
        investments:investmentsReducer,
    },
    });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;