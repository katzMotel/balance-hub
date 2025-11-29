import { configureStore } from "@reduxjs/toolkit";  
import accountsReducer from "./slices/accountsSlice";
import uiReducer from "./slices/uiSlice";
export const store = configureStore({
    reducer: {
        // Add your reducers here
        accounts: accountsReducer,
        ui: uiReducer,
    },
    });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;