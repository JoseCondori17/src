import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input";

interface DataTableSearchProps<TData> {
  table: Table<TData>
  columnName: string,
}

export function DataTableSearch<TData>({ table, columnName}: DataTableSearchProps<TData>) {

  return (
    <Input
      placeholder="Buscar por nombre"
      value={(table.getColumn(columnName)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(columnName)?.setFilterValue(event.target.value)
      }
      className="h-8 w-[150px] lg:w-[250px]"
    />
  );
}