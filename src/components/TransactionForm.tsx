"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DatePicker } from "@/components/DatePicker"
import type { Transaction, TransactionType } from "@/types"
import { useToast } from "@/hooks/use-toast"
import { PlusCircle } from "lucide-react"

const formSchema = z.object({
  date: z.date({
    required_error: "Date of transaction is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }).max(100, { message: "Description must be 100 characters or less."}),
  value: z.coerce.number().positive({
    message: "Value must be a positive number.",
  }).refine(val => val * 100 - Math.floor(val * 100) < Number.EPSILON * 100 * val || val * 100 - Math.floor(val * 100) > Number.EPSILON * 100 * val === false , { // check for max 2 decimal places
    message: "Value can have at most 2 decimal places."
  }),
  type: z.enum(["Credit", "Debit"], {
    required_error: "You need to select a transaction type.",
  }),
})

interface TransactionFormProps {
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export function TransactionForm({ addTransaction }: TransactionFormProps) {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      value: undefined, 
      type: undefined,
      date: new Date(),
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    addTransaction({
      ...values,
      type: values.type as TransactionType, // Ensure type safety
    });
    toast({
      title: "Transaction Added",
      description: `Successfully registered ${values.type} of ${values.value}.`,
    })
    form.reset();
    form.setValue("date", new Date()); // Reset date to today after submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Transaction</FormLabel>
              <DatePicker date={field.value} setDate={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Office supplies" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 150.75" {...field} step="0.01" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Credit" />
                    </FormControl>
                    <FormLabel className="font-normal">Credit</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Debit" />
                    </FormControl>
                    <FormLabel className="font-normal">Debit</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
        </Button>
      </form>
    </Form>
  )
}
