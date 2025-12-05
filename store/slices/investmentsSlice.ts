import { createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Investment } from "@/types/types.index";
import { getMultipleStockPrices } from "@/lib/api/stocks";

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
export const updatePrices = createAsyncThunk(
    'investments/updatePrices',
    async(_, {getState}) =>{
        const state = getState() as RootState;
        const symbols = state.investments.investments.map(inv => inv.symbol);
        const prices = await getMultipleStockPrices(symbols);
        return prices;
    }
);
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
        restoreInvestments: (state, action: PayloadAction<Investment[]>) =>{
            state.investments = action.payload;
            state.lastUpdated = null;
        }
    },
    extraReducers:(builder) =>{
        builder
        .addCase(fetchInvestments.pending, (state) =>{
            state.loading = true;
        })
        .addCase(fetchInvestments.fulfilled, (state, action)=>{
            if (state.investments.length === 0){
                state.loading = false;
                state.investments = action.payload;
            } else{
                state.loading = false;
            }
            
        })
        .addCase(addInvestment.fulfilled, (state,action)=>{
            state.investments.push(action.payload);
        })
        .addCase(updatePrices.fulfilled, (state,action)=>{
            state.investments = state.investments.map(inv => ({
                ...inv,
                currentPrice: action.payload[inv.symbol] || inv.currentPrice
            }));
            state.lastUpdated = new Date().toISOString();
            state.loading = false;
        })
        .addCase(updatePrices.pending, (state)=>{
            state.loading = true;
        });
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
export const{editInvestment,deleteInvestment, restoreInvestments} = InvestmentsSlice.actions;
export default InvestmentsSlice.reducer;