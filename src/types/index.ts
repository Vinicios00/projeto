export type TransactionType = 'Credit' | 'Debit';

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  value: number;
  type: TransactionType;
}
