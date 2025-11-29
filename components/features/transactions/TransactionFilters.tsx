'use client';
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilter, clearFilters, selectFilteredTransactions } from "@/store/slices/transactionsSlice";

export function TransactionFilters() {
    const dispatch = useAppDispatch();
    const filteredTransactions = useAppSelector(selectFilteredTransactions);
    return (
        <div className = "flex gap-4 items-end">
            <Select
                label="Category"
                onChange={(e)=> dispatch(setFilter({ key: 'category', value: e.target.value }))}
            >
            <option value="">All Categories</option>
            <option value="Salary">Salary</option>
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>  
            </Select>
            <Select
                label="Type"
                onChange={(e)=> dispatch(setFilter({ key: 'type', value: e.target.value }))}
            >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            </Select>
            <Button 
                variant="outline" 
                onClick={() => dispatch(clearFilters())}
            >
                Clear Filters
            </Button>
            <p className="text-sm text-gray-600">
                Showing {filteredTransactions.length} transactions
            </p>
        </div>
    )
}