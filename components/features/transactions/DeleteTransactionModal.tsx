import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useAppDispatch } from '@/store/hooks';
import { deleteTransaction } from '@/store/slices/transactionsSlice';

interface DeleteTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    transactionId: string;
}

export function DeleteTransactionModal({ isOpen, onClose, transactionId }: DeleteTransactionModalProps) {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(deleteTransaction(transactionId));
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
                        <CardTitle>Delete Transaction</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-gray-700 dark:text-gray-300">
                            Are you sure you want to delete this transaction? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}