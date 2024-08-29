'use client'
import {ColumnDef} from "@tanstack/table-core";
import { DataTableColumnHeader } from "./data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";
import {MoreHorizontalIcon} from "hugeicons-react";
import { DialogDelete } from "../dialog/dialog-delete";
import { NewProduct } from "@/lib/validators";
import { formatCurrency } from "@/lib/formats";
import { statusesProducts } from "@/constants/data";
import { DialogProduct } from "../dialog/dialog-product";
import { writeText } from '@tauri-apps/api/clipboard'

export const ColumnsProducts: ColumnDef<NewProduct>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoria" />
    ),
    cell: ({ row }) => {
      const status = statusesProducts.category.find(
        (status) => status.value === row.getValue("category")
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
    accessorKey: "size_small",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pequeño" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("size_small"));

      return (
        <p>{formatCurrency(amount)}</p>
      )
    },
  },
  {
    accessorKey: "size_medium",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mediano" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("size_medium"));

      return (
        <p>{formatCurrency(amount)}</p>
      )
    },
  },
  {
    accessorKey: "size_large",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grande" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("size_large"));

      return (
        <p>{formatCurrency(amount)}</p>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={async () => await writeText(product.id.toString())}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DialogProduct product_id={product.id.toString()} data={product} title="Editar producto" description="Complete todos los campos necesarios"></DialogProduct>
            <DialogDelete product_id={product.id.toString()} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]