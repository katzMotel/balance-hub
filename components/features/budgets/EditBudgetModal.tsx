"use client";
import {useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';
import { useAppDispatch } from '@/store/hooks';
import { editBudget } from '@/store/slices/budgetsSlice';
import { Budget, BudgetPeriod } from '@/types/types.index';
import { Edit, Save } from 'lucide-react';
import { isReactCompilerRequired } from 'next/dist/build/swc/generated-native';

interface EditBudgetModalProps{
    isOpen: boolean;
    onClose: () => void;
    budget: Budget;
}

export function EditBudgetModal({isOpen, onClose, budget}: EditBudgetModalProps){
    const [category, setCategory] = useState(budget.category);
    const [period, setPeriod] = useState<BudgetPeriod>(budget.period);
    const [amount, setAmount] = useState(budget.amount.toString());
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if(isOpen){
            setCategory(budget.category);
            setPeriod(budget.period);
            setAmount(budget.amount.toString());
        }
    },[isOpen, budget]);

    const handleSubmit = async(e: React.FormEvent) =>{
        e.preventDefault();
        await dispatch(editBudget({
            id: budget.id,
            changes:{
                category,
                period,
                amount: parseFloat(amount),
            }
        }));
        onClose();
    };
    if(!isOpen) return null;
    return(
        <>
            <div className="fixed-inset-0 bg-black/50 z-40"
                 onClick={onClose}
            />
            
            <div className="fixed inset-0 p-50 flex items-center justify-center p-4 pointer-events-none">
                <Card className="w-full max-w-md pointer-events-auto">
                    <CardHeader>    
                        <CardTitle>Edit Budget</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Budget Category"
                                type="text"
                                value={category}
                                onChange={(e)=> setCategory(e.target.value)}
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
                                label="Budget Amount"
                                type="number"
                                value={amount}
                                onChange={(e)=> setAmount(e.target.value)}
                                required
                                step="0.01"
                            />
                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Save Change
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );

}