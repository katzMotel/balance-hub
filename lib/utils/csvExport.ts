import { Account } from "@/types/types.index";
import { Transaction } from "@/types/types.index";
import { Budget } from "@/types/types.index";
import { Investment } from "@/types/types.index";

export const exportToCSV = (data:any[], filename:string) =>{
    if (data.length === 0) return;
    const headers = Object.keys(data[0]);

    const csvContent = [
        headers.join(','),
        ...data.map(row => 
            headers.map(header => {
                const value = row[header];
                if(typeof value === 'string' && (value.includes(',') || value.includes('"'))){
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(',')
        )
    ].join('\n')

    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href= url;
    link.download = `${filename}-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
};
export const exportAllToCSV = (
    accounts: Account[],
    transactions: Transaction[],
    budgets: Budget[],
    investments: Investment[]
) =>{
    exportToCSV(accounts, 'balancehub-accounts');
    exportToCSV(transactions, 'balancehub-transactions');
    exportToCSV(budgets, 'balancehub-budgets');
    exportToCSV(investments, 'balancehub-investments');
};