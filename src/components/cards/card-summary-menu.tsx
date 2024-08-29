import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "../ui/input";
import { useOrder } from "@/context/order-context";
import { AffiliateIcon, Cancel01Icon, CashbackIcon, CreditCardIcon, DiscountTag01Icon, SmartPhone01Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDateToDateString } from "@/lib/formats";
import { formatDate } from "@/lib/formats";
import { formatTime } from "@/lib/formats";
import { useState, useEffect } from "react";
import { Order } from "@/interfaces/order";
/* import { invoke } from '@tauri-apps/api' */
import { postOrder } from "@/services/api";
import { DialogGenerateOrder } from "../dialog/dialog-generate-order";

export function CardSummaryMenu() {
  const { orderItems, removeItemFromOrder, resetOrderItems } = useOrder();
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  
  const calculateSubtotal = () => {
    return orderItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const subTotal = parseFloat(calculateSubtotal().toFixed(2));
  const total = parseFloat(subTotal.toFixed(2));
  const date = new Date();

  /* function printerOrder(values: Order) {    
    invoke('format_receipt', {
      items: values.items,
      subTotal: values.subTotal,
      total: values.total,
      paymentMethod: values.paymentMethod,
    }).then()
      .catch(console.error);
  } */

  async function onSubmit() {
    try {
      const now = new Date();
      const values = {
        items: orderItems,
        subTotal: subTotal,
        total: total,
        paymentMethod: paymentMethod,
      };
      postOrder(values);
      /* printerOrder(values); */
      resetOrderItems();
      setPaymentMethod('cash');
    } catch (error) {
      console.error('Error en la operación:', error);
    }
  }

  return (
    <Card className="w-96 mt-4">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>Detalles de orden</CardTitle>
          <CardDescription className="flex flex-col">
            <span>Fecha: {formatDate(date)}</span>
            <span>Hora: {formatTime(date)}</span>
          </CardDescription>
        </div>
        <div className="flex gap-2">
          {/* add discount */}
          <Dialog>
            <DialogTrigger asChild>
              <Button size={'icon'} variant={'outline'} disabled>
                <DiscountTag01Icon size={24}></DiscountTag01Icon>
              </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col w-72">
              <DialogTitle>Agregar un descuento</DialogTitle>
              <Input id="add-discount" className="col-span-3" type="string"/>
              <DialogFooter className="items-center justify-end">
                <Button>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* add extras */}
          <Dialog>
            <DialogTrigger asChild>    
              <Button size={'icon'} variant={'outline'} disabled>
                <AffiliateIcon size={24}></AffiliateIcon>
              </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col w-72">
              <DialogTitle>Agregar un monto extra</DialogTitle>
              <Input id="add-extras" className="col-span-3" type="string"/>
              <DialogFooter className="items-center justify-end">
                <Button>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100vh-480px)]">
        <ScrollArea className="h-[calc(100vh-495px)]">
          <div className="space-y-2">
          {
            orderItems.map((item, index) => (
              <div key={index} className="relative flex items-center justify-between text-sm border border-dashed rounded-xl w-full p-2">
                <div className="flex flex-col">
                  <span>{item.productName}</span>
                  <span className="text-[0.65rem] text-muted-foreground uppercase">Tamaño {item.size}</span>
                  <span className="text-[0.65rem] text-muted-foreground uppercase">Cantidad {item.quantity}</span>
                </div>
                <span className="font-semibold">{formatCurrency(item.quantity * item.price)}</span>
                <Button 
                  size={'icon'} 
                  variant={'ghost'} 
                  className="absolute top-1 right-1 opacity-40 hover:rounded-full hover:opacity-95 h-5 w-5"
                  onClick={() => removeItemFromOrder(index)}
                >
                  <Cancel01Icon size={10}></Cancel01Icon>
                </Button>
              </div>
            ))
          }
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex flex-col text-sm gap-1 w-full">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">{formatCurrency(subTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Extras</span>
            <span className="font-semibold">S/ 0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Discount</span>
            <span className="font-semibold">S/ 0</span>
          </div>
          <div className="border border-dashed"></div>
          <div className="flex justify-between text-lg font-bold">
            <span className="text-muted-foreground">Total</span>
            <span className="font-semibold">{formatCurrency(total)}</span>
          </div>
        </div>
        <div className="flex w-full gap-2">
          <Button 
            className={cn('grow', paymentMethod === 'cash' ? 'bg-primary text-white hover:bg-primary hover:text-white' : '')} 
            variant={'outline'} 
            size={'sm'} 
            onClick={() => setPaymentMethod('cash')}
          >
            <CashbackIcon></CashbackIcon>
          </Button>
          <Button 
            className={cn('grow', paymentMethod === 'card' ? 'bg-primary text-white hover:bg-primary hover:text-white' : '')} 
            variant={'outline'} 
            size={'sm'} 
            onClick={() => setPaymentMethod('card')}
          >
            <CreditCardIcon></CreditCardIcon>
          </Button>
          <Button 
            className={cn('grow', paymentMethod === 'phone' ? 'bg-primary text-white hover:bg-primary hover:text-white' : '')} 
            variant={'outline'} 
            size={'sm'} 
            onClick={() => setPaymentMethod('phone')}
          >
            <SmartPhone01Icon></SmartPhone01Icon>
          </Button>
        </div>
        {/* <Button className="w-full select-none" type="submit" onClick={onSubmit} disabled={orderItems.length == 0}>Generar pedido</Button> */}
        <DialogGenerateOrder onSubmit={onSubmit} disabled={orderItems.length == 0} amount={total} paymentMethod={paymentMethod}></DialogGenerateOrder>
      </CardFooter>
    </Card>
  );
}