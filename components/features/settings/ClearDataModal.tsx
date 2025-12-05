import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { AlertTriangle } from "lucide-react";

interface ClearDataModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function ClearDataModal({ isOpen, onClose, onConfirm }: ClearDataModalProps) {
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
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-danger-100 dark:bg-danger-900 flex items-center justify-center">
                                <AlertTriangle className="h-5 w-5 text-danger-600 dark:text-danger-400" />
                            </div>
                            <CardTitle>Clear All Data?</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-gray-700 dark:text-gray-300">
                                This will permanently delete:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                <li>All accounts</li>
                                <li>All transactions</li>
                                <li>All budgets</li>
                                <li>All investments</li>
                            </ul>
                            <p className="text-sm font-semibold text-danger-600 dark:text-danger-400">
                                This action cannot be undone!
                            </p>
                        </div>
                        
                        <div className="flex justify-end gap-2 mt-6">
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={onConfirm}>
                                Yes, Clear All Data
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}