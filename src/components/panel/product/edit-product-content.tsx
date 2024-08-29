'use client'
import { FormProduct } from "../../forms/form-product";
import { useFetch } from "@/hooks/useFecth";

interface EditProductContentProps {
  product_id: string
  data: any
}

export function EditProductContent({ product_id, data }: EditProductContentProps) {
  
  return (
    <FormProduct products={data} id={product_id}></FormProduct>
  );
}

