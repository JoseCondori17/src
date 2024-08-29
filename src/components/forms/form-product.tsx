'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { NewProduct, NewProductSchema } from "@/lib/validators";
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductDefaultValues } from "@/constants/forms";
import { Textarea } from "../ui/textarea";
import InputMoney from "../inputs/input-money";
import { toast } from "../ui/use-toast";
import { formatDate, formatTime } from "@/lib/formats";
import { useRouter } from "next/navigation";
import { patchProduct, postProduct } from "@/services/api";

interface FormProductProps {
  products?: any
  id: string
}

export function FormProduct({ products, id }: FormProductProps) {
  const router = useRouter();
  const initialValues = products || ProductDefaultValues; 
  const isEditMode = !!products;
  const formProduct = useForm<NewProduct>({
    resolver: zodResolver(NewProductSchema),
    defaultValues: initialValues,
  });
  async function onSubmit(values: NewProduct){
    const newValues = {
      ...values,
      sizesPricing: {
        s: values.size_small,
        m: values.size_medium,
        l: values.size_large,
      }
    }
    const response = isEditMode
      ? await patchProduct(newValues, id)
      : await postProduct(newValues)

    if (response.success) {
      toast({
        title: isEditMode ? "Actualizado correctament" : "Agregado correctamente",
        description: `${formatDate(new Date())} ${formatTime(new Date())}`,
      })
      router.push('/pos/menu');
    } else {
      toast({
        variant: "destructive",
        title: "Error en procesar",
        description: "There was an error processing your request.",
      })
    }
  }

  return (
    <Form {...formProduct}>
      <form onSubmit={formProduct.handleSubmit(onSubmit, (error) => {console.log(error)})} className="flex flex-col gap-4">
        <FormField 
          control={formProduct.control}
          name="productName"
          render={({ field }) => (
            <FormItem className="flex-grow space-y-0.5">
              <FormLabel>Nombres del producto</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa el nombre del producto" {...field}/>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <FormField 
          control={formProduct.control}
          name="productDescription"
          render={({ field }) => (
            <FormItem className="flex-grow space-y-0.5">
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea placeholder="Ingresa una descripcion" className="resize-none" {...field}/>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <FormField 
          control={formProduct.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex-grow space-y-0.5">
              <FormLabel>Categoria</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione la categoria"></SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="food">Comida</SelectItem>
                    <SelectItem value="drink">Bebidas</SelectItem>
                    <SelectItem value="fritters">Churros</SelectItem>
                    <SelectItem value="ice-cream">Helados</SelectItem>
                  </SelectContent>
                </Select>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <InputMoney
            form={formProduct} 
            name="size_small"
            label="Pequeño"
            placeholder="S/ 0.00"
            disabled={false}
          />
          <InputMoney
            form={formProduct} 
            name="size_medium"
            label="Mediano"
            placeholder="S/ 0.00"
            disabled={false}
          />
          <InputMoney
            form={formProduct} 
            name="size_large"
            label="Grande"
            placeholder="S/ 0.00"
            disabled={false}
          />
        </div>
        <Button type="submit">
          { isEditMode ? 'Actualizar' : 'Agregar' }
        </Button>
      </form>
    </Form>
  );
}