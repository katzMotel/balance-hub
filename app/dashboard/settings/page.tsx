"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Download, Trash2, ExternalLink, Github } from "lucide-react";
import { ClearDataModal } from "@/components/features/settings/ClearDataModal";
import { exportAllToCSV } from "@/lib/utils/csvExport";
import { clearState } from "@/lib/utils/localStorage";

export default function SettingsPage() {
    const dispatch = useAppDispatch();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    
    // Get all Redux state
    const accounts = useAppSelector((state) => state.accounts);
    const transactions = useAppSelector((state) => state.transactions);
    const budgets = useAppSelector((state) => state.budgets);
    const investments = useAppSelector((state) => state.investments);
    
    const handleExportJSON = () => {
        const data = {
            accounts: accounts.accounts,
            transactions: transactions.transactions,
            budgets: budgets.budgets,
            investments: investments.investments,
            exportedAt: new Date().toISOString(),
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `balancehub-data-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleExportCSV = () => {
        exportAllToCSV(
            accounts.accounts,
            transactions.transactions,
            budgets.budgets,
            investments.investments
        );
    };
    
    const handleConfirmClear = () => {
        clearState();
        setIsConfirmModalOpen(false);
        window.location.reload();
    };
    
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Settings
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage your application data
                </p>
            </div>
            
            {/* Data Management */}
            <Card>
                <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Export Section */}
                        <div className="space-y-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">Export Data</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Download all your data
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleExportJSON} variant="outline" size="sm" className="flex-1">
                                    <Download className="h-4 w-4 mr-2" />
                                    Export JSON
                                </Button>
                                <Button onClick={handleExportCSV} variant="outline" size="sm" className="flex-1">
                                    <Download className="h-4 w-4 mr-2" />
                                    Export CSV
                                </Button>
                            </div>
                        </div>
                        
                        {/* Clear Data Section */}
                        <div className="flex items-center justify-between p-4 border border-danger-200 dark:border-danger-800 rounded-lg bg-danger-50 dark:bg-danger-900/20">
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">Clear All Data</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Permanently delete all accounts, transactions, and budgets
                                </p>
                            </div>
                            <Button onClick={() => setIsConfirmModalOpen(true)} variant="danger">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Clear
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            {/* About */}
            <Card>
                <CardHeader>
                    <CardTitle>About BalanceHub</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                A modern personal finance dashboard built with Next.js, TypeScript, and Redux Toolkit.
                            </p>
                        </div>
                        
                        <div className="flex gap-4">
                            <a 
                                href="https://github.com/katzMotel" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
                            >
                                <Github className="h-4 w-4" />
                                GitHub
                            </a>
                            <a 
                                href="https://yourportfolio.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
                            >
                                <ExternalLink className="h-4 w-4" />
                                Portfolio
                            </a>
                        </div>
                        
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Version 1.0.0 • Built by Dylan Giddens
                        </p>
                    </div>
                </CardContent>
            </Card>
            
            <ClearDataModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmClear}
            />
        </div>
    );
}