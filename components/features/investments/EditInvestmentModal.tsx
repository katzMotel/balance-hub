"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { editInvestment } from '@/store/slices/investmentsSlice';
import { fetchAccounts, selectAllAccounts } from '@/store/slices/accountsSlice';
import { Investment } from '@/types/types.index';

interface EditInvestmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    investment: Investment;
}

export function EditInvestmentModal({ isOpen, onClose, investment }: EditInvestmentModalProps) {
    const [symbol, setSymbol] = useState(investment.symbol);
    const [name, setName] = useState(investment.name);
    const [shares, setShares] = useState(investment.shares.toString());
    const [purchasePrice, setPurchasePrice] = useState(investment.purchasePrice.toString());
    const [accountId, setAccountId] = useState(investment.accountId);
    const [purchaseDate, setPurchaseDate] = useState(investment.purchaseDate);
    const dispatch = useAppDispatch();
    const accounts = useAppSelector(selectAllAccounts);

    useEffect(() => {
        dispatch(fetchAccounts());
    }, [dispatch]);

    useEffect(() => {
        if (isOpen) {
            setSymbol(investment.symbol);
            setName(investment.name);
            setShares(investment.shares.toString());
            setPurchasePrice(investment.purchasePrice.toString());
            setAccountId(investment.accountId);
            setPurchaseDate(investment.purchaseDate);
        }
    }, [isOpen, investment]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(editInvestment({
            id: investment.id,
            changes: {
                symbol: symbol.toUpperCase(),
                name,
                shares: parseFloat(shares),
                purchasePrice: parseFloat(purchasePrice),
                accountId,
                purchaseDate,
            }
        }));
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
                        <CardTitle>Edit Investment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Stock Symbol"
                                type="text"
                                value={symbol}
                                onChange={(e) => setSymbol(e.target.value)}
                                required
                            />

                            <Input
                                label="Company Name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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