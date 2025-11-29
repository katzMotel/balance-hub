import { configureStore } from "@reduxjs/toolkit";  
import accountsReducer from "./slices/accountsSlice";
import uiReducer from "./slices/uiSlice";
import transactionsReducer from "./slices/transactionsSlice";
export const store = configureStore({
    reducer: {
        // Add your reducers here
        accounts: accountsReducer,
        ui: uiReducer,
        transactions: transactionsReducer,
    },
    });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;