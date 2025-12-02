'use client';
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBudgets, selectAllBudgets, selectBudgetByCategory } from "@/store/slices/budgetsSlice";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

import { Budget } from "@/types/types.index";

export default function BudgetsPage(){
    const dispatch = useAppDispatch();
    const budgets = useAppSelector(selectAllBudgets);
    const [isAddModalOpen, setIsAddModalOpen]= useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() =>{
        dispatch(fetchBudgets());
    },[dispatch]);

    return(
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                         Budgets
                    </h2>
                    <p className="text-gray-600 dark:text-white">Track and create your Budgets </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Card>
        
            <CardTitle>
                <p className="text-sm text-gray-600 dark:text-white">{budgets.name}</p>
            </CardTitle>
            <CardContent>

            </CardContent>
        </Card>
        </div>
        </div>
        
    );
}