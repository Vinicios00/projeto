"use client"

import * as React from "react";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionTable } from "@/components/TransactionTable";
import { Header } from "@/components/Header";
import type { Transaction } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    // Load transactions from local storage on initial mount
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      try {
        const parsedTransactions = JSON.parse(storedTransactions).map((tx: any) => ({
          ...tx,
          date: new Date(tx.date), // Ensure date is a Date object
        }));
        setTransactions(parsedTransactions);
      } catch (error) {
        console.error("Failed to parse transactions from localStorage", error);
        localStorage.removeItem("transactions"); // Clear corrupted data
      }
    }
  }, []);

  React.useEffect(() => {
    // Save transactions to local storage whenever they change
    if(isClient) {
       localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions, isClient]);

  const addTransactionHandler = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: crypto.randomUUID(),
    };
    setTransactions((prevTransactions) => {
      const updatedTransactions = [newTransaction, ...prevTransactions];
      // Sort all transactions by date descending (newest first)
      // This ensures the entire list is correctly sorted before rendering
      updatedTransactions.sort((a, b) => b.date.getTime() - a.date.getTime());
      return updatedTransactions;
    });
  };

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Register Transaction</CardTitle>
                <CardDescription>Fill in the details to add a new financial entry.</CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionForm addTransaction={addTransactionHandler} />
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            {isClient ? (
               <TransactionTable transactions={transactions} />
            ) : (
              <Card className="mt-8 md:mt-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-center font-headline text-xl">Transaction History</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center p-10">
                  <p>Loading transactions...</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <footer className="py-6 mt-auto text-center text-muted-foreground text-sm border-t">
        <p>&copy; {new Date().getFullYear()} ContAI Ledger. All rights reserved.</p>
      </footer>
    </>
  );
}
