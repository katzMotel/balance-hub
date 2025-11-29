export type AccountType = 'checking' | 'savings' | 'credit' | 'investment';
export type TransactionType = 'income' | 'expense' ;
export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
}

export interface Transaction{
  id: string;
  accountId: string;
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
  date: string; 
  createdAt: string; 
  
}