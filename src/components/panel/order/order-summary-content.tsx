import { CardPaymentMethod } from "@/components/cards/card-payment-method";
import { CardOptions } from "@/components/cards/card-options";
import { CardSummaryOrder } from "@/components/cards/card-summary-order";
import { formatCurrency } from "@/lib/formats";
import { calculateAmount, filterDate, filterMonth, filterPaymentMethod, getAllOrders } from "@/lib/utils";

interface OrderSummaryContentProps {
  filteredData: any
  data: any
}

export function OrderSummaryContent({filteredData, data}: OrderSummaryContentProps) {
  const now = new Date();

  const filterByMonth = filterMonth(data, now, "created_at");
  const filterCash = filterPaymentMethod(filteredData, "cash", "paymentMethod");
  const filterMovil = filterPaymentMethod(filteredData, "phone", "paymentMethod");
  const filterCard = filterPaymentMethod(filteredData, "card", "paymentMethod");

  const totalMonth = calculateAmount(filterByMonth, "total");
  const totalDay = calculateAmount(filteredData, "total");
  const totalCash = calculateAmount(filterCash, "total");
  const totalMovil = calculateAmount(filterMovil, "total");
  const totalCard = calculateAmount(filterCard, "total");
  const totalOrders = filteredData.length;
  const paymentMethods = [
    {name: "Efectivo", total: formatCurrency(totalCash)},
    {name: "Yape o Plin", total: formatCurrency(totalMovil)},
    {name: "Tarjeta", total: formatCurrency(totalCard)},
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <CardSummaryOrder title="Total de ventas del mes" amount={totalMonth} format={true}></CardSummaryOrder>
        <CardSummaryOrder title="Total de ventas del dia" amount={totalDay} format={true}></CardSummaryOrder>
        <CardSummaryOrder title="Cantidad de ordenes del dia" amount={totalOrders} format={false}></CardSummaryOrder>
        <CardPaymentMethod title="Metodos de pago" paymentMethods={paymentMethods}></CardPaymentMethod>
      </div>
      <CardOptions data={filteredData}></CardOptions>
    </div>
  );
}