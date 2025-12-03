import {createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Budget } from '@/types/types.index';
interface BudgetsState{
    budgets: Budget[];
    loading: boolean;
    filters:{

    }
}
const initialState: BudgetsState ={
    budgets:[],
    loading:false,
    filters:{},


}

export const fetchBudgets = createAsyncThunk(
    'budgets/fetchBudgets',
    async() =>{
        await new Promise(resolve => setTimeout(resolve, 500));
        return[
            {
               id:'1',
               category: "Groceries",
               amount:250,
               period: 'weekly' as const,
               createdAt: new Date().toISOString(),
            },
            {
                id:'2',
                category: "Utilities",
                amount: 400,
                period: 'weekly' as const,
                createdAt: new Date().toISOString(),
            },
            {
                id:'3',
                category:"Entertainment",
                amount: 150,
                period: 'weekly' as const,
                createdAt: new Date().toISOString(), 
            },
            {
                id:'4',
                category:"Health/Medical",
                amount:1000,
                period: 'monthly' as const,
                createdAt: new Date().toISOString(),
            }
        ]
    }

);
export const addBudget = createAsyncThunk(
    'budgets/addBudget',
    async(newBudget: Omit<Budget, 'id'|'createdAt'>) =>{
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            ...newBudget,
            id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        };
    }
);
export const selectBudgetsWithSpent = (state: RootState) => {
    const budgets = state.budgets.budgets;
    const transactions = state.transactions.transactions;
  
    return budgets.map(budget => {
      // Calculate spent amount for this budget's category
      const spent = transactions
        .filter(t => t.category === budget.category && t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
      return {
        ...budget,
        spent
      };
    });
  };

const budgetsSlice = createSlice({
    name: 'budgets',
    initialState,
    reducers:{
       editBudget: (state, action:PayloadAction<{id:string; changes: Partial<Budget>}>)=>{
        const index = state.budgets.findIndex(b => b.id === action.payload.id);
        if(index !== -1){
            state.budgets[index] = {...state.budgets[index], ...action.payload.changes};
        }
       },
       deleteBudget: (state, action:PayloadAction<string>)=>{
        state.budgets = state.budgets.filter(b => b.id!== action.payload);
       },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchBudgets.pending, (state) =>{
            state.loading = true;
        })
        .addCase(fetchBudgets.fulfilled, (state, action)=>{
            state.loading = false;
            state.budgets = action.payload;
        })
        .addCase(addBudget.fulfilled, (state, action)=>{
            state.budgets.push(action.payload);
        });

    },
});

export const selectAllBudgets = (state: RootState) => state.budgets.budgets;
export const selectBudgetByCategory = (state:RootState, category: string) =>
    state.budgets.budgets.find(b => b.category === category);
export const{editBudget, deleteBudget } = budgetsSlice.actions;
export default budgetsSlice.reducer;