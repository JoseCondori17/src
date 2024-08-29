'use client'
import { ColumnsProducts } from "@/components/data-table/columns-products";
import { DataTableOverview } from "../../data-table/data-table-overview";
import { statusesProducts, filtersProducts } from "@/constants/data";
import { useFetch } from "@/hooks/useFecth";

export function DataTableProductContent() {
  const {data, loading} = useFetch('https://x8ki-letl-twmt.n7.xano.io/api:L_ZjFp2S/product');

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <DataTableOverview 
      data={data} 
      columns={ColumnsProducts} 
      statuses={statusesProducts} 
      columnName="productName"
      facetedFilter={filtersProducts}
    ></DataTableOverview>
  );
}