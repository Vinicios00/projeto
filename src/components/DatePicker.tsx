"use client"

import * as React from "react"
import { format } from "date-fns"
import type { CalendarIcon } from "lucide-react" 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Dynamically import CalendarIcon only on the client
const LucideCalendarIcon = React.lazy(() => 
  import("lucide-react").then(module => ({ default: module.CalendarIcon }))
);


interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
}

export function DatePicker({ date, setDate, disabled }: DatePickerProps) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {isClient && (
            <React.Suspense fallback={<div className="h-4 w-4" />}>
              <LucideCalendarIcon className="mr-2 h-4 w-4" />
            </React.Suspense>
          )}
          {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
