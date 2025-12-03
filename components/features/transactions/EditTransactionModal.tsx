"use client";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { editTransaction } from '@/store/slices/transactionsSlice';
import { Transaction, TransactionType } from '@/types/types.index';
import { fetchAccounts, selectAllAccounts } from '@/store/slices/accountsSlice';
import { fetchBudgets,selectAllBudgets } from '@/store/slices/budgetsSlice';
interface EditTransactionModalProps {
    transaction: Transaction;
    isOpen: boolean;
    onClose: () => void;
}

export function EditTransactionModal({ isOpen, onClose, transaction }: EditTransactionModalProps) {
    const [accountId, setAccountId] = useState(transaction.accountId);
    const [description, setDescription] = useState(transaction.description);
    const [amount, setAmount] = useState(Math.abs(transaction.amount).toString());
    const [date, setDate] = useState(transaction.date);
    const [category, setCategory] = useState(transaction.category);
    const [type, setType] = useState<TransactionType>(transaction.type);
    const dispatch = useAppDispatch();
    const accounts = useAppSelector(selectAllAccounts);
    const budgets = useAppSelector(selectAllBudgets);
    useEffect(() => {
        dispatch(fetchAccounts());
        dispatch(fetchBudgets());
    }, [dispatch]);

    // Update state when transaction changes
    useEffect(() => {
        if (isOpen) {
            setAccountId(transaction.accountId);
            setDescription(transaction.description);
            setAmount(Math.abs(transaction.amount).toString());
            setDate(transaction.date);
            setCategory(transaction.category);
            setType(transaction.type);
        }
    }, [isOpen, transaction]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(editTransaction({
            id: transaction.id,
            changes: {
                accountId,
                description,
                amount: type === 'expense' ? -Math.abs(parseFloat(amount)) : parseFloat(amount),
                date,
                category,
                type,
            }
        }));
        onClose();
    };
    
    if (!isOpen) return null;
    
    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <Card className="w-full max-w-md pointer-events-auto">
                    <CardHeader>
                        <CardTitle>Edit Transaction</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Select
                                label="Account"
                                value={accountId}
                                onChange={(e) => setAccountId(e.target.value)}
                                required
                            >
                                <option value="">Select Account</option>
                                {accounts.map(account => (
                                    <option key={account.id} value={account.id}>
                                        {account.name}
                                    </option>
                                ))}
                            </Select>

                            <Input
                                label="Description"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />

                            <Select
                                label="Type"
                                value={type}
                                onChange={(e) => setType(e.target.value as TransactionType)}
                                required
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </Select>

                            <Input
                                label="Amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                step="0.01"
                            />

                            <Select
                                label="Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Select Category</option>
                                {budgets.map(budget=> (
                                    <option key={budget.id} value={budget.category}>
                                    {budget.category}
                                    </option>
                                ))}
                                
                            </Select>

                            <Input
                                label="Date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />

                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}