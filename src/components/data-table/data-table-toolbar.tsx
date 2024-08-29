"use client"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { DataTableViewOptions } from "./data-table-view-options"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableSearch } from "./data-table-search"
import Link from "next/link"
import { DataRangePicker } from "../calendar/data-range-picker"
import { useMemo } from "react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  statuses: any
  columnName: string
  facetedFilter: any[]
}

export function DataTableToolbar<TData>({
  table,
  statuses, 
  columnName,
  facetedFilter,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { minDate, maxDate } = useMemo(() => {
    let min = new Date()
    let max = new Date(0)
    table.getPreFilteredRowModel().flatRows.forEach(row => {
      const date = new Date(row.getValue("created_at"))
      if (date < min) min = date
      if (date > max) max = date
    })
    return { minDate: min, maxDate: max }
  }, [table])

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DataTableSearch table={table} columnName={columnName}/>
        {
          facetedFilter.map((item, index) => (
            table.getColumn(item.value) && (
              <DataTableFacetedFilter
                column={table.getColumn(item.value)}
                title={item.label}
                options={statuses[item.value]}
                key={index}
              />)
          ))
        }
        {
          table.getColumn("created_at") && (
            <DataRangePicker column={table.getColumn("created_at")} minDate={minDate} maxDate={maxDate}/>
          )
        }
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        {
          columnName == 'productName' ? (
            <Button size={'sm'} asChild>
              <Link href={'/pos/products/add-product'}>Agregar producto</Link>
            </Button>
          ) : ''
        }
      </div>
    </div>
  )
}