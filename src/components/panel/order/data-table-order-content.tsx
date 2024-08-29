'use client'
import { ColumnsOrders } from "../../data-table/columns-orders";
import { DataTableOverview } from "../../data-table/data-table-overview";
import { statusesOrders, filtersOrders } from "@/constants/data";
import { useEffect } from 'react';

interface DataTableOrderContentProps {
  data: any
  loading: boolean
  setFilteredData: any
}

export function DataTableOrderContent({data, loading, setFilteredData}: DataTableOrderContentProps) {
  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data, setFilteredData]);

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
      columns={ColumnsOrders} 
      statuses={statusesOrders} 
      columnName="id"
      facetedFilter={filtersOrders}
      setFilteredData={setFilteredData}
    ></DataTableOverview>
  );
}