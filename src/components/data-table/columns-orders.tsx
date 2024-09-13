'use client'
import { startOfDay, endOfDay } from 'date-fns';
import {ColumnDef} from "@tanstack/table-core";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Order } from "@/lib/validators";
import { formatCurrency, formatDate, formatTime } from "@/lib/formats";
import { statusesOrders } from "@/constants/data";

export const ColumnsOrders: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha y Hora" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));

      return (
        <p>{formatDate(date)} - {formatTime(date)}</p>
      )
    },
    filterFn: (row, id, value: {from?: number, to?: number}) => {
      if (!value?.from && !value?.to) return true;
      const cellValue = row.getValue(id) as number;
      const from = value?.from;
      const to = value?.to;
      
      if (from && to) {
        return cellValue >= from && cellValue <= to;
      } else if (from) {
        return cellValue >= from;
      } else if (to) {
        return cellValue <= to;
      }
      return true;
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "items",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Items" />
    ),
    cell: ({ row }) => {
      const items: any[] = row.getValue("items");
      
      return (
        <p>{items.length}</p>
      );
    },
    filterFn: (row, id, value) => {
      const items: any[] = row.getValue(id);
      
      const filterValues = value.map((v: any) => v.value);
      return items.some((item: any) => filterValues.includes(item.productName));
    },
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Metodo de pago" />
    ),
    cell: ({ row }) => {
      const status = statusesOrders["paymentMethod"].find(
        (status) => status.value === row.getValue("paymentMethod")
      );

      if (!status) {
        return null
      };

      return (
        <p>{status.label}</p>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "subTotal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sub total" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("subTotal"));

      return (
        <p>{formatCurrency(amount)}</p>
      )
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));

      return (
        <p>{formatCurrency(amount)}</p>
      )
    },
  },
]