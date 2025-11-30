"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useAppDispatch } from '@/store/hooks';
import { addAccount } from '@/store/slices/accountsSlice';
import { AccountType } from '@/types/types.index';

interface AddAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddAccountModal({ isOpen, onClose }: AddAccountModalProps) {
    const [name, setName] = useState('');
    const [type, setType] = useState<AccountType>('checking');
    const [balance, setBalance] = useState('');
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(addAccount({
            name,
            type,
            balance: parseFloat(balance),
            currency: 'USD',
        }));
        // Reset form
        setName('');
        setType('checking');
        setBalance('');
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
                        <CardTitle>Add New Account</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Account Name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            
                            <Select
                                label="Account Type"
                                value={type}
                                onChange={(e) => setType(e.target.value as AccountType)}
                                required
                            >
                                <option value="checking">Checking</option>
                                <option value="savings">Savings</option>
                                <option value="credit">Credit</option>
                                <option value="investment">Investment</option>
                            </Select>
                            
                            <Input
                                label="Initial Balance"
                                type="number"
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                                required
                                step="0.01"
                            />
                            
                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Add Account
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}