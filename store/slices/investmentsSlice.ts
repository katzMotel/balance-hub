import { createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Investment } from "@/types/types.index";

interface InvestmentsState{
    investments: Investment[];
    loading: boolean;
    lastUpdated: string | null;
    
}
const initialState: InvestmentsState ={
    investments:[],
    loading:false,
    lastUpdated:null,
    
}

export const fetchInvestments = createAsyncThunk(
    'investments/fetchInvestments',
    async() => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            {
                id: '1',
                symbol: "AAPL",
                name: "Apple Inc.",
                shares: 10,
                purchasePrice: 150.00,
                currentPrice: 195.50,
                accountId: '1',  // Match your account IDs
                purchaseDate: new Date('2024-01-15').toISOString(),
                createdAt: new Date('2024-01-15').toISOString(),
            },
            {
                id: '2',
                symbol: "TSLA",
                name: "Tesla Inc.",
                shares: 5,
                purchasePrice: 220.00,
                currentPrice: 248.75,
                accountId: '1',
                purchaseDate: new Date('2024-06-10').toISOString(),
                createdAt: new Date('2024-06-10').toISOString(),
            },
            {
                id: '3',
                symbol: "MSFT",
                name: "Microsoft Corporation",
                shares: 8,
                purchasePrice: 380.00,
                currentPrice: 425.20,
                accountId: '2',
                purchaseDate: new Date('2024-03-22').toISOString(),
                createdAt: new Date('2024-03-22').toISOString(),
            }
        ];
    }
);
export const addInvestment = createAsyncThunk(
    'investments/addInvestment',
    async(newInvestment: Omit<Investment,'id'|'createdAt'>)=>{
        await new Promise(resolve=>setTimeout(resolve,500));
        return{
            ...newInvestment,
            id: Math.random().toString(36).substr(2,9),
            createdAt: new Date().toISOString(),
        };
    }
);
const InvestmentsSlice = createSlice({
    name: "investments",
    initialState,
    reducers:{
        editInvestment: (state, action:PayloadAction<{id:string; changes: Partial<Investment>}>)=>{
            const index = state.investments.findIndex(i => i.id === action.payload.id);
            if(index !== -1){
                state.investments[index] = {...state.investments[index], ...action.payload.changes};
            }
        },
        deleteInvestment: (state, action:PayloadAction<string>)=>{
            state.investments = state.investments.filter(i => i.id!== action.payload);
        },
    },
    extraReducers:(builder) =>{
        builder
        .addCase(fetchInvestments.pending, (state) =>{
            state.loading = true;
        })
        .addCase(fetchInvestments.fulfilled, (state, action)=>{
            state.loading = false;
            state.investments = action.payload;
        })
        .addCase(addInvestment.fulfilled, (state,action)=>{
            state.investments.push(action.payload);
        })
    },
});
export const selectAllInvestments = (state:RootState) => state.investments.investments;
export const selectPortfolioSummary = (state: RootState) => {
    const investments = state.investments.investments;
    const totalValue = investments.reduce((sum,inv) =>
    sum + (inv.shares * inv.currentPrice),0
    );
    const totalCost = investments.reduce((sum, inv) =>
        sum + (inv.shares * inv.purchasePrice),0
    );
    const totalGain = totalValue - totalCost;
    const totalGainPercent = totalCost > 0 ? (totalGain/totalCost) * 100 : 0;
    return {
        totalValue,
        totalCost,
        totalGain,
        totalGainPercent
    };
};
export const{editInvestment,deleteInvestment} = InvestmentsSlice.actions;
export default InvestmentsSlice.reducer;