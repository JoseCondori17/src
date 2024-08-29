'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import { Add01Icon, Remove01Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";
import { useOrder } from "@/context/order-context";

interface CardItemMenuProps {
  productName: string
  description: string
  sizesPricing: {
    s: number,
    m: number,
    l: number,
  }
}

export function CardItemMenu({ productName, description, sizesPricing, ...props }: CardItemMenuProps) {
  const sizeBase = () => {
    if (sizesPricing.s > 0.0) return 's'
    if (sizesPricing.m > 0.0) return 'm'
    if (sizesPricing.l > 0.0) return 'l'
    return ''
  } 
  
  const priceBase = () => {
    if (sizesPricing.s > 0.0) return sizesPricing.s
    if (sizesPricing.m > 0.0) return sizesPricing.m
    if (sizesPricing.l > 0.0) return sizesPricing.l
    return 0
  }

  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string>(sizeBase());
  const [price, setPrice] = useState<number>(priceBase());
  const { addItemToOrder  } = useOrder();

  const addValue = () => setQuantity(value => value + 1);
  const reduceValue = () => setQuantity(value => (value > 1 ? value - 1 : value)); 
  const handleAddToOrder = () => {
    addItemToOrder({ productName, size, quantity, price });
    setQuantity(1);
    setSize(sizeBase());
    setPrice(priceBase());
  };

  return (
    <Card className="grow select-none" {...props}>
      <CardHeader>
        <CardTitle>{ productName }</CardTitle>
        <CardDescription>{ description }</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm">
        <p>Tamaño</p>
        <div className="flex items-center gap-2">
          <Button 
            variant={'outline'} 
            size={'icon'} 
            className={cn('rounded-full', size === 's' ? 'bg-primary text-white' : '')}
            onClick={() => {
              setSize('s');
              setPrice(sizesPricing.s);
            }}
            disabled={sizesPricing.s === 0}
          >
            S
          </Button>
          <Button 
            variant={'outline'} 
            size={'icon'} 
            className={cn('rounded-full', size === 'm' ? 'bg-primary text-white' : '')}
            onClick={() => {
              setSize('m');
              setPrice(sizesPricing.m);
            }}
            disabled={sizesPricing.m === 0}
          >
            M
          </Button>
          <Button 
            variant={'outline'} 
            size={'icon'} 
            className={cn('rounded-full', size === 'l' ? 'bg-primary text-white' : '')}
            onClick={() => {
              setSize('l');
              setPrice(sizesPricing.l);
            }}
            disabled={sizesPricing.l === 0}
          >
            L
          </Button>
        </div>
        <p>Cantidad</p>
        <div className="flex items-center gap-2">
          <Button 
            variant={'outline'} 
            size={'icon'} 
            className="rounded-full" 
            onClick={reduceValue}
            disabled={quantity === 1}
          >
            <Remove01Icon size={15}></Remove01Icon>
          </Button>
          <span className="font-bold">{quantity}</span>
          <Button 
            variant={'outline'} 
            size={'icon'} 
            className="rounded-full" 
            onClick={addValue}
          >
            <Add01Icon size={15}></Add01Icon>
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleAddToOrder}>Agregar</Button>
      </CardFooter>
    </Card>
  );
}