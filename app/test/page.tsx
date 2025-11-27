'use client';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import{
    fetchAccounts,
    selectAllAccounts,
    selectTotalBalance,
    deleteAccount,
} from "@/store/slices/accountsSlice";

export default function TestPage() {
    const dispatch = useAppDispatch();
    const accounts = useAppSelector(selectAllAccounts);
    const totalBalance = useAppSelector(selectTotalBalance);

    useEffect(() => {
        dispatch(fetchAccounts());
    }, [dispatch]);

    return (
        <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Redux Test</h1>
      
      <div className="mb-4">
        <p className="text-lg">Total Balance: ${totalBalance.toFixed(2)}</p>
      </div>

      <div className="space-y-2">
        {accounts.map(account => (
          <div key={account.id} className="border p-4 rounded">
            <h3 className="font-bold">{account.name}</h3>
            <p>${account.balance.toFixed(2)}</p>
            <button 
              onClick={() => dispatch(deleteAccount(account.id))}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
    );
}