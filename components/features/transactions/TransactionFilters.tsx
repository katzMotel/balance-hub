'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilter, clearFilters, selectFilteredTransactions, setSortBy, setSortOrder, setSearchQuery } from "@/store/slices/transactionsSlice";
import { useState } from "react";
export function TransactionFilters() {
    const dispatch = useAppDispatch();
    const filteredTransactions = useAppSelector(selectFilteredTransactions);
    
    // Add state to track current filter values
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [sortBy, setSortByLocal] = useState('date');
    const [sortOrder, setSortOrderLocal] = useState('desc');
    const [search, setSearch] = useState('');
    
    const handleClearFilters = () => {
        // Clear Redux state
        dispatch(clearFilters());
        // Reset local state
        setCategory('');
        setType('');
        setSortByLocal('date');
        setSortOrderLocal('desc');
        setSearch('');
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Search */}
                    <Input
                        label="Search"
                        placeholder="Search by description or category..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            dispatch(setSearchQuery(e.target.value));
                        }}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <Select
                            label="Category"
                            value={category}
                            onChange={(e) => {
                                const value = e.target.value;
                                setCategory(value);
                                dispatch(setFilter({ 
                                    key: 'category', 
                                    value: value === '' ? undefined : value 
                                }));
                            }}
                        >
                            <option value="">All </option>
                            <option value="Salary">Salary</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Utilities">Utilities</option>  
                        </Select>

                        <Select
                            label="Type"
                            value={type}
                            onChange={(e) => {
                                const value = e.target.value;
                                setType(value);
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

                        <Select
                            label="Sort By"
                            value={sortBy}
                            onChange={(e) => {
                                const value = e.target.value as 'date' | 'amount' | 'description';
                                setSortByLocal(value);
                                dispatch(setSortBy(value));
                            }}
                        >
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                            <option value="description">Description</option>
                        </Select>

                        <Select
                            label="Order"
                            value={sortOrder}
                            onChange={(e) => {
                                const value = e.target.value as 'asc' | 'desc';
                                setSortOrderLocal(value);
                                dispatch(setSortOrder(value));
                            }}
                        >
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </Select>

                        <div className="flex items-end">
                            <Button 
                                variant="outline" 
                                onClick={handleClearFilters}
                                className="w-full h-[42px]"
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        Showing {filteredTransactions.length} transactions
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}