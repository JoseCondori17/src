import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { EditProductContent } from "../panel/product/edit-product-content";

interface DialogProductProps {
  product_id: string | ''
  data: any
  title: string
  description: string
}

export function DialogProduct({product_id, data, title, description} : DialogProductProps ) {
  return (
    <Dialog>
      <DialogTrigger className={'text-sm hover:bg-gray-100 w-full h-full text-start p-[0.35rem] pl-2 rounded'}>
        {title}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <EditProductContent product_id={product_id} data={data}></EditProductContent>
      </DialogContent>
    </Dialog>
  );
}