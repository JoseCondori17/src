"use client"
import * as React from "react"
import { addDays, format, startOfDay, endOfDay } from "date-fns"
import { Calendar01Icon } from "hugeicons-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Column } from "@tanstack/react-table"

interface DataRangePickerProps<TData, TValue> {
  column?: Column<TData, TValue>
  minDate: any
  maxDate: any
  className?: React.HTMLAttributes<HTMLDivElement>
}

export function DataRangePicker<TData, TValue>({column, minDate, maxDate, className}: DataRangePickerProps<TData, TValue>) {
  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    const storedValue = column?.getFilterValue() as DateRange | undefined
    return storedValue || { from: maxDate, to: maxDate };
  })

  const handleSelect = (newDate: DateRange | undefined) => {
    setDate(newDate)
    const filterValue = newDate ? {
      from: newDate.from ? startOfDay(newDate.from).getTime() : undefined,
      to: newDate.to ? endOfDay(newDate.to).getTime() : undefined
    } : undefined
    column?.setFilterValue(filterValue)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[220px] h-8 border-dashed justify-start text-left text-xs font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <Calendar01Icon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={1}
            fromDate={minDate}
            toDate={maxDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}