"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useAppDispatch } from '@/store/hooks';
import { editAccount } from '@/store/slices/accountsSlice';
import { Account, AccountType } from '@/types/types.index';
import { Edit, Save } from 'lucide-react';

interface EditAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    account: Account;
}

export function EditAccountModal({ isOpen, onClose, account }: EditAccountModalProps) {
    const [name, setName] = useState(account.name);
    const [type, setType] = useState<AccountType>(account.type);
    const [balance, setBalance] = useState(account.balance.toString());
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(isOpen) {
            setName(account.name);
            setType(account.type);
            setBalance(account.balance.toString());
        }
    }, [isOpen, account]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(editAccount({
            id: account.id, 
            changes:{
                name,
                type,
                balance: parseFloat(balance),
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
                        <CardTitle>Edit Account</CardTitle>
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