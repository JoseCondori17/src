'use client'
import { ContentLayout } from "@/components/panel/content-layout";
import { OrderPanelContent } from "@/components/panel/order/order-panel-content";

export default function Orders() {
  return (
    <ContentLayout title="Ordenes">
      <OrderPanelContent></OrderPanelContent>
    </ContentLayout>
  );
}