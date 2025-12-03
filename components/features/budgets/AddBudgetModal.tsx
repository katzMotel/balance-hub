"use client";
import {useState} from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardHeader, CardTitle,CardContent } from '@/components/ui/Card';
import { useAppDispatch } from '@/store/hooks';
import { addBudget } from '@/store/slices/budgetsSlice';
import { BudgetPeriod } from '@/types/types.index';

interface AddBudgetModalProps{
    isOpen: boolean;
    onClose: () => void;
}

export function AddBudgetModal({isOpen,onClose}: AddBudgetModalProps){
    const [category, setCategory] = useState('');
    const [period, setPeriod] = useState<BudgetPeriod>('monthly');
    const [amount, setAmount] = useState('');
    const dispatch = useAppDispatch();

    const handleSubmit = async(e:React.FormEvent) =>{
        e.preventDefault();
        await dispatch(addBudget({
            category,
            period,
            amount: parseFloat(amount),
            
        }));
        setCategory('');
        setPeriod('monthly');
        setAmount('');
        onClose()
    };
    if(!isOpen) return null;
    return(
        <>
            <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <Card className="w-full max-w-md pointer-events-auto">
                    <CardHeader>
                        <CardTitle>Add New Budget</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Category Name"
                                type="text"
                                value={category}
                                onChange={(e) => {
                                    console.log('Selected Category:', e.target.value);
                                    setCategory(e.target.value);
                                }}
                                placeholder="e.g., Groceries, Dining Out"
                                required
                            />
                            <Select
                                label="Budget Period"
                                value={period}
                                onChange={(e)=> setPeriod(e.target.value as BudgetPeriod)}
                                required
                            >
                                <option value="monthly">Monthly</option>
                                <option value="weekly">Weekly</option>
                                <option value="yearly">Yearly</option>
                            </Select>
                            <Input
                                label = "Budget Amount"
                                type="number"
                                value={amount}
                                onChange={(e)=> setAmount(e.target.value)}
                                required
                            />
                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type ="submit">
                                    Add Budget
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card> 
            </div>
        </>
    );
}
