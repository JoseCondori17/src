"use client"
import { DataTable } from "../data-table/data-table";
import { useState, useEffect } from "react"

import {
  ColumnDef,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  statuses: any
  columnName: string
  facetedFilter: any[]
  setFilteredData?: React.Dispatch<React.SetStateAction<TData[]>>
}

export function DataTableOverview<TData, TValue>({ columns, data, statuses, columnName, facetedFilter, setFilteredData  }: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const filteredRowModel = table.getFilteredRowModel();
  useEffect(() => {
    if (setFilteredData) {
      const filteredRows = filteredRowModel.rows;
      const filteredData = filteredRows.map(row => row.original);
      setFilteredData(filteredData as TData[]);
    }
  }, [filteredRowModel, setFilteredData]);

  return (
    <DataTable table={table} columns={columns} statuses={statuses} columnName={columnName} facetedFilter={facetedFilter}/>
  );
}