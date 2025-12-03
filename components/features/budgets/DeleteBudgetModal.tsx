import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/store/hooks";
import { deleteBudget } from "@/store/slices/budgetsSlice";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Budget } from "@/types/types.index";

interface DeleteBudgetModalProps {
    isOpen: boolean;
    onClose: () => void;
    budget: Budget;
}

export function DeleteBudgetModal({ isOpen, onClose, budget }: DeleteBudgetModalProps) {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(deleteBudget(budget.id));
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <Card className="w-full max-w-md pointer-events-auto">
                    <CardHeader>
                        <CardTitle>Delete Budget</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-gray-700 dark:text-gray-300">
                            Are you sure you want to delete the budget for "<strong>{budget.category}</strong>"? This action cannot be undone.
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