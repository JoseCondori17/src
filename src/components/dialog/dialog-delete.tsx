import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast";
import { deleteProductById } from "@/services/api";

interface DialogDeleteProps {
  product_id: string
}

export function DialogDelete({product_id}: DialogDeleteProps) {
  async function handlerDelete(){
    const res = await deleteProductById(product_id);
    if (res.success){
      toast({
        title: "Se borro correctamente",
        description: new Date().toLocaleString(),
      })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className={'text-sm hover:bg-gray-100 w-full h-full text-start p-[0.35rem] pl-2 rounded'}>
        Eliminar producto
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar producto</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Está seguro de que desea eliminar este producto? Esta acción no se puede deshacer y eliminará permanentemente el producto de su inventario.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className={'bg-red-500 hover:bg-red-400'} onClick={handlerDelete}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}