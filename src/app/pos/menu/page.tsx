import { ContentLayout } from "@/components/panel/content-layout";
//import { MenuPanelContent } from "@/components/panel/menu-panel-content";
import { OrderProvider } from "@/context/order-context";
import dynamic from "next/dynamic";
//import { MenuHeadContent } from "@/components/panel/menu-head-content"; // quitar

const MenuPanelContent = dynamic(() => import("@/components/panel/menu-panel-content"), {
  ssr: false,
  loading: () => <span>cargando</span>,
});

export default function Menu() {
  return (
    <ContentLayout title="Menu">
      <OrderProvider>
        <MenuPanelContent></MenuPanelContent>
      </OrderProvider>
    </ContentLayout>
  );
}