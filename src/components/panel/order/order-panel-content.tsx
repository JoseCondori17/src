'use client'
import { DataTableOrderContent } from "./data-table-order-content";
import { useFetch } from "@/hooks/useFecth";
import { useState, useEffect } from "react";
import { OrderSummaryContent } from "./order-summary-content";

function getAllOrders(objetos: any[]) {
  return objetos.reduce((acc, objeto) => acc.concat(objeto.orders), []);
}

export function OrderPanelContent() {
  const {data, loading} = useFetch('https://x8ki-letl-twmt.n7.xano.io/api:K09c96PL/order');
  const [filteredData, setFilteredData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      <OrderSummaryContent filteredData={filteredData} data={data}></OrderSummaryContent>
      <DataTableOrderContent data={data} loading={loading} setFilteredData={setFilteredData}></DataTableOrderContent>
    </div>
  );
}
