import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/store/hooks";
import { deleteAccount } from "@/store/slices/accountsSlice";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Account } from "@/types/types.index";

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    account: Account;
}

export function DeleteAccountModal({ isOpen, onClose, account }: DeleteAccountModalProps) {
    const dispatch = useAppDispatch();

    const handleDelete = async () => {
        await dispatch(deleteAccount(account.id));
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
                        <CardTitle>Delete Account</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-gray-700 dark:text-gray-300">
                            Are you sure you want to delete the account "<strong>{account.name}</strong>"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-2">
                            <Button 
                                variant="outline" 
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="danger" 
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}