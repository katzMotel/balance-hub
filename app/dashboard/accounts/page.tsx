'use client';
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAccounts, selectAllAccounts, selectTotalBalance } from "@/store/slices/accountsSlice";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils/format";
import { Plus, Edit, Trash2, CreditCard } from "lucide-react";
import { AddAccountModal } from "@/components/features/accounts/AddAccountModal";
import { EditAccountModal } from "@/components/features/accounts/EditAccountModal";
import { DeleteAccountModal } from "@/components/features/accounts/DeleteAccountModal";
import { Account } from "@/types/types.index";

export default function AccountsPage() {
    const dispatch = useAppDispatch();
    const accounts = useAppSelector(selectAllAccounts);
    const totalBalance = useAppSelector(selectTotalBalance);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchAccounts());
    }, [dispatch]);

    const handleEdit = (account: Account) => {
        setSelectedAccount(account);
        setIsEditModalOpen(true);
    };
   const handleDelete = (account: Account) => {
       setSelectedAccount(account);
       setIsDeleteModalOpen(true);
   };
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Accounts
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your financial accounts
                    </p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Account
                </Button>
            </div>

            {/* Total Balance Card */}
            <Card>
                <CardContent>
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Balance</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                {formatCurrency(totalBalance)}
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Accounts List */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {accounts.map((account) => (
                    <Card key={account.id} hover>
                        <CardContent>
                            <div className="space-y-4 pt-6">
                                {/* Account Header */}
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                            {account.name}
                                        </h3>
                                        <Badge 
                                            variant="neutral"
                                            size="sm"
                                            className="capitalize"
                                        >
                                            {account.type}
                                        </Badge>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400" 
                                            onClick={() => handleEdit(account)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button className="text-gray-400 hover:text-danger-600 dark:hover:text-danger-400"
                                            onClick={() => handleDelete(account)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Balance */}
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Balance</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {formatCurrency(account.balance)}
                                    </p>
                                </div>

                                {/* Institution */}
                                {account.institution && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {account.institution}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {accounts.length === 0 && (
                <Card>
                    <CardContent>
                        <div className="text-center py-12">
                            <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                No accounts
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Get started by adding your first account.
                            </p>
                            <div className="mt-6">
                                <Button onClick={() => setIsAddModalOpen(true)}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Account
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Modals */}
            <AddAccountModal 
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
            
            {selectedAccount && (
                <EditAccountModal 
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedAccount(null);
                    }}
                    account={selectedAccount}
                />
            )}

            {selectedAccount && (
                <DeleteAccountModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    account={selectedAccount}
                /> 
            )}
        </div>
    );
}