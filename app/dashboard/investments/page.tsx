"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchInvestments, selectAllInvestments, selectPortfolioSummary, updatePrices } from "@/store/slices/investmentsSlice";       
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils/format";
import { Plus, Edit, Trash2, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { AddInvestmentModal } from "@/components/features/investments/AddInvestmentModal";
import { EditInvestmentModal } from "@/components/features/investments/EditInvestmentModal";
import { DeleteInvestmentModal } from "@/components/features/investments/DeleteInvestmentModal";
import { Investment } from "@/types/types.index";

export default function InvestmentsPage() {
    const dispatch = useAppDispatch();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
    const investments = useAppSelector(selectAllInvestments);
    const portfolioSummary = useAppSelector(selectPortfolioSummary);
    const loading = useAppSelector((state) => state.investments.loading);
    const lastUpdated = useAppSelector((state) => state.investments.lastUpdated);

    useEffect(() => {
        dispatch(fetchInvestments());
    }, [dispatch]);

    const handleEdit = (investment: Investment) => {
        setSelectedInvestment(investment);
        setIsEditModalOpen(true);
    };

    const handleDelete = (investment: Investment) => {
        setSelectedInvestment(investment);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Investments
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your Portfolio
                    </p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add Investment 
                </Button>
            </div>

            {/* Portfolio Summary */}
            <Card>
                <CardContent>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between py-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Portfolio Value</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                {formatCurrency(portfolioSummary.totalValue)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Gain/Loss</p>
                            <p className={`text-2xl font-bold ${
                                portfolioSummary.totalGain >= 0 
                                    ? 'text-success-600 dark:text-success-400' 
                                    : 'text-danger-600 dark:text-danger-400'
                            }`}>
                                {portfolioSummary.totalGain >= 0 ? '+' : ''}{formatCurrency(portfolioSummary.totalGain)} 
                                ({portfolioSummary.totalGainPercent.toFixed(2)}%)
                            </p>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-2">
                            <Button 
                                onClick={() => dispatch(updatePrices())}
                                disabled={loading}
                                size="sm"
                                className="w-full md:w-auto"
                                >
                                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                                Refresh Prices
                            </Button>
                            {lastUpdated && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Last updated: {formatDistanceToNow(new Date(lastUpdated))} ago
                                </p>
                         )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Investments Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {investments.map((investment) => {
                    const totalValue = investment.shares * investment.currentPrice;
                    const totalCost = investment.shares * investment.purchasePrice;
                    const gain = totalValue - totalCost;
                    const gainPercent = (gain / totalCost) * 100;

                    return (
                        <Card key={investment.id} hover>
                            <CardContent>
                                <div className="space-y-4 pt-6">
                                    {/* Header with symbol and edit/delete buttons */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-2xl text-gray-900 dark:text-white">
                                                {investment.symbol}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {investment.name}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                                                onClick={() => handleEdit(investment)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button 
                                                className="text-gray-400 hover:text-danger-600 dark:hover:text-danger-400"
                                                onClick={() => handleDelete(investment)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Shares */}
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Shares</p>
                                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {investment.shares}
                                        </p>
                                    </div>

                                    {/* Current Value */}
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Current Value</p>
                                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                                            {formatCurrency(totalValue)}
                                        </p>
                                    </div>

                                    {/* Gain/Loss */}
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Gain/Loss</p>
                                        <p className={`text-lg font-semibold ${
                                            gain >= 0 
                                                ? 'text-success-600 dark:text-success-400' 
                                                : 'text-danger-600 dark:text-danger-400'
                                        }`}>
                                            {gain >= 0 ? '+' : ''}{formatCurrency(gain)} ({gainPercent.toFixed(2)}%)
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Modals */}
            <AddInvestmentModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />

            {selectedInvestment && (
                <EditInvestmentModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedInvestment(null);
                    }}
                    investment={selectedInvestment}
                />
            )}

            {selectedInvestment && (
                <DeleteInvestmentModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedInvestment(null);
                    }}
                    investment={selectedInvestment}
                />
            )}
        </div>
    );
}