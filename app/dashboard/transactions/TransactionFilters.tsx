'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilter, clearFilters, selectFilteredTransactions } from "@/store/slices/transactionsSlice";

export function TransactionFilters() {
    const dispatch = useAppDispatch();
    const filteredTransactions = useAppSelector(selectFilteredTransactions);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select
                        label="Category"
                        onChange={(e) => {
                            const value = e.target.value;
                            dispatch(setFilter({ 
                                key: 'category', 
                                value: value === '' ? undefined : value 
                            }));
                        }}
                    >
                        <option value="">All Categories</option>
                        <option value="Salary">Salary</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Utilities">Utilities</option>  
                    </Select>

                    <Select
                        label="Type"
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === '') {
                                dispatch(setFilter({ key: 'type', value: undefined }));
                            } else {
                                dispatch(setFilter({ key: 'type', value: value as 'income' | 'expense' }));
                            }
                        }}
                    >
                        <option value="">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </Select>

                    <div className="flex flex-col gap-2">
                        <Button 
                            variant="outline" 
                            onClick={() => dispatch(clearFilters())}
                            className="w-full"
                        >
                            Clear Filters
                        </Button>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                            Showing {filteredTransactions.length} transactions
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
