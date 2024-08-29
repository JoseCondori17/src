import { ContentLayout } from "@/components/panel/content-layout";
import { FormProduct } from "@/components/forms/form-product";

export default function AddProduct() {
  return (
    <ContentLayout title="Nuevo producto">
      <FormProduct id={''}></FormProduct>
    </ContentLayout>
  );
}