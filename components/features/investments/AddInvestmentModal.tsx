"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addInvestment } from '@/store/slices/investmentsSlice';
import { fetchAccounts, selectAllAccounts } from '@/store/slices/accountsSlice';

interface AddInvestmentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddInvestmentModal({ isOpen, onClose }: AddInvestmentModalProps) {
    const [symbol, setSymbol] = useState('');
    const [name, setName] = useState('');
    const [shares, setShares] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [accountId, setAccountId] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const dispatch = useAppDispatch();
    const accounts = useAppSelector(selectAllAccounts);

    useEffect(() => {
        dispatch(fetchAccounts());
    }, [dispatch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(addInvestment({
            symbol: symbol.toUpperCase(),
            name,
            shares: parseFloat(shares),
            purchasePrice: parseFloat(purchasePrice),
            currentPrice: parseFloat(purchasePrice), // Start with purchase price
            accountId,
            purchaseDate,
        }));
        // Reset form
        setSymbol('');
        setName('');
        setShares('');
        setPurchasePrice('');
        setAccountId('');
        setPurchaseDate('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div 
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />
            
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <Card className="w-full max-w-md pointer-events-auto">
                    <CardHeader>
                        <CardTitle>Add New Investment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Stock Symbol"
                                type="text"
                                value={symbol}
                                onChange={(e) => setSymbol(e.target.value)}
                                placeholder="e.g., AAPL, TSLA"
                                required
                            />

                            <Input
                                label="Company Name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., Apple Inc."
                                required
                            />

                            <Input
                                label="Number of Shares"
                                type="number"
                                value={shares}
                                onChange={(e) => setShares(e.target.value)}
                                step="0.01"
                                required
                            />

                            <Input
                                label="Purchase Price per Share"
                                type="number"
                                value={purchasePrice}
                                onChange={(e) => setPurchasePrice(e.target.value)}
                                step="0.01"
                                required
                            />

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
                                label="Purchase Date"
                                type="date"
                                value={purchaseDate}
                                onChange={(e) => setPurchaseDate(e.target.value)}
                                required
                            />

                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Add Investment
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}