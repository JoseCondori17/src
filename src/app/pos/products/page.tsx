import { ContentLayout } from "@/components/panel/content-layout";
import { DataTableProductContent } from "@/components/panel/product/data-table-product-content";

export default function Products() {
  return (
    <ContentLayout title="Productos">
      <DataTableProductContent></DataTableProductContent>
    </ContentLayout>
  );
}