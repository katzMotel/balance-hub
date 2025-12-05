'use client';
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBudgets, selectAllBudgets, selectBudgetsWithSpent } from "@/store/slices/budgetsSlice";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils/format";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Budget } from "@/types/types.index";
import { AddBudgetModal } from "@/components/features/budgets/AddBudgetModal";
import { EditBudgetModal } from "@/components/features/budgets/EditBudgetModal";
import { DeleteBudgetModal } from "@/components/features/budgets/DeleteBudgetModal";
export default function BudgetsPage() {
    const dispatch = useAppDispatch();
    const budgets = useAppSelector(selectBudgetsWithSpent);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        const hasLocalStorage = localStorage.getItem('balancehub-data');
        if(!hasLocalStorage){
            dispatch(fetchBudgets());
        }
        
    }, [dispatch, budgets.length]);
    const handleEdit = (budget: Budget) =>{
        setSelectedBudget(budget);
        setIsEditModalOpen(true);
    }
    const handleDelete = (budget:Budget) =>{
        setSelectedBudget(budget);
        setIsDeleteModalOpen(true);
    }
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Budgets
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Track and create your Budgets 
                    </p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add Budget
                </Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {budgets.map((budget) => (
                    <Card key={budget.id} hover>
                        <CardContent>
                            <div className="space-y-4 pt-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                            {budget.category}
                                        </h3>
                                        <Badge
                                            variant="neutral"
                                            size="sm"
                                            className="capitalize"
                                        >
                                            {budget.period}
                                        </Badge>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                                            onClick={()=> handleEdit(budget)}    
                                            >
                                            <Edit className="h-4 w-4"/>
                                        </button>
                                        <button 
                                            className="text-gray-400 hover:text-primary-600 dark:hover:text-danger-400"
                                            onClick={()=> handleDelete(budget)}
                                        >
                                            <Trash2 className="h-4 w-4"/>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Amount</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {formatCurrency(budget.amount)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Spent</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {formatCurrency(budget.spent)}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {Math.round((budget.spent / budget.amount) * 100)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full ${
                                                (budget.spent / budget.amount) >= 0.9 
                                                    ? 'bg-danger-500' 
                                                    : (budget.spent / budget.amount) >= 0.7 
                                                    ? 'bg-warning-500' 
                                                    : 'bg-success-500'
                                            }`}
                                            style={{ width: `${Math.min((budget.spent / budget.amount) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Modals */}
            <AddBudgetModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
            {selectedBudget && (
                <EditBudgetModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedBudget(null);
                    }}
                    budget={selectedBudget}
                    />
            )}

            {selectedBudget && (
                <DeleteBudgetModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedBudget(null);
                    }}
                    budget={selectedBudget}
                />
            )}
        </div>
    );
}