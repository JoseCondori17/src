'use client'
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
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useState } from "react"
import { formatCurrency } from "@/lib/formats"

interface DialogGenerateOrderProps {
  onSubmit: any
  disabled: boolean
  amount: number
  paymentMethod: string
}

export function DialogGenerateOrder({onSubmit, disabled, amount, paymentMethod}: DialogGenerateOrderProps) {
  const [res, setRes] = useState<number>(0);
  const [payment, setPayment] = useState<string>('');

  const handleCalculate = () => {
    const paymentValue = parseFloat(payment); 
    if (!isNaN(paymentValue)) {
      const change = paymentValue - amount;
      setRes(parseFloat(change.toFixed(2)));
    }
  }

  const resetValues = () => {
    setRes(0);
    setPayment('');
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full select-none" disabled={disabled}>Generar pedido</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar el pedido</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-2">
            Una vez confirmado la orden no podra eliminarlo
            {
              paymentMethod === 'cash' && (
                <>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Monto con el que paga" 
                      value={payment} 
                      onChange={(e) => setPayment(e.target.value)} 
                    />
                    <Button variant={'outline'} onClick={handleCalculate}>Calcular vuelto</Button>
                  </div>
                  <div className="flex items-center justify-between text-base">
                    <p className="font-bold">Vuelto</p> 
                    <span>{formatCurrency(res)}</span>
                  </div>
                </>
              )
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={resetValues}>Cancelar</AlertDialogCancel>
          <AlertDialogAction type="submit" onClick={() => {
            onSubmit(); 
            resetValues();
          }}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}