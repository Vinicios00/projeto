"use client"

import type { Transaction } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
  TableFooter,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { TrendingUp, TrendingDown, FileText } from "lucide-react"

interface TransactionTableProps {
  transactions: Transaction[];
}

interface GroupedTransactions {
  [key: string]: {
    transactions: Transaction[];
    totalCredit: number;
    totalDebit: number;
  };
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const groupTransactionsByMonthYear = (): GroupedTransactions => {
    return transactions.reduce((acc: GroupedTransactions, transaction) => {
      const monthYear = format(transaction.date, "MMMM yyyy");
      if (!acc[monthYear]) {
        acc[monthYear] = { transactions: [], totalCredit: 0, totalDebit: 0 };
      }
      acc[monthYear].transactions.push(transaction);
      if (transaction.type === "Credit") {
        acc[monthYear].totalCredit += transaction.value;
      } else {
        acc[monthYear].totalDebit += transaction.value;
      }
      // Sort transactions within each group by date descending (newest first)
      acc[monthYear].transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
      return acc;
    }, {});
  };

  const grouped = groupTransactionsByMonthYear();
  // Sort month-year keys chronologically descending (newest month-year first)
  const sortedMonthYears = Object.keys(grouped).sort((a, b) => {
    const dateA = new Date(a.split(" ")[1], getMonthIndex(a.split(" ")[0]));
    const dateB = new Date(b.split(" ")[1], getMonthIndex(b.split(" ")[0]));
    return dateB.getTime() - dateA.getTime();
  });

  function getMonthIndex(monthName: string) {
    return new Date(Date.parse(monthName +" 1, 2012")).getMonth()
  }


  if (transactions.length === 0) {
    return (
      <Card className="mt-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center font-headline text-xl">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
            <FileText className="w-16 h-16 mb-4" />
            <p className="text-lg">No transactions yet.</p>
            <p>Add a transaction using the form above to see it here.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };


  return (
    <Card className="mt-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center font-headline text-xl">Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedMonthYears.map((monthYear) => (
          <div key={monthYear} className="mb-8">
            <h3 className="text-lg font-semibold font-headline mb-3 p-2 bg-secondary/50 rounded-md">
              {monthYear}
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-center">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grouped[monthYear].transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{format(transaction.date, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="text-right">{formatCurrency(transaction.value)}</TableCell>
                    <TableCell className="text-center">
                      {transaction.type === "Credit" ? (
                        <span className="flex items-center justify-center text-green-600">
                          <TrendingUp className="mr-1 h-4 w-4" /> Credit
                        </span>
                      ) : (
                        <span className="flex items-center justify-center text-red-600">
                          <TrendingDown className="mr-1 h-4 w-4" /> Debit
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow className="bg-muted/50 hover:bg-muted/60">
                  <TableCell colSpan={2} className="font-semibold text-right">Monthly Totals:</TableCell>
                  <TableCell className="text-right font-semibold">
                    Credits: <span className="text-green-600">{formatCurrency(grouped[monthYear].totalCredit)}</span>
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    Debits: <span className="text-red-600">{formatCurrency(grouped[monthYear].totalDebit)}</span>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        ))}
        {transactions.length > 0 && <TableCaption>End of transaction list.</TableCaption>}
      </CardContent>
    </Card>
  );
}
