'use client'
import { ContentLayout } from "@/components/panel/content-layout";
import { OrderPanelContent } from "@/components/panel/order/order-panel-content";
import { useAuth } from "@/context/auth-context";

export default function Orders() {
  const { isAuthenticated, user, role } = useAuth();
  if (role == 'admin') {
    return (
      <ContentLayout title="Ordenes">
        <OrderPanelContent></OrderPanelContent>
      </ContentLayout>
    );
  }
  
  if (role == 'employee'){
    return (
      <span>Permisos insuficientes</span>
    );
  }
}