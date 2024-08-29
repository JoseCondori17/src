'use client'
import { createContext, useContext, useState, ReactNode } from "react";
import { OrderItem } from "@/interfaces/order";

interface OrderContextProps {
  orderItems: OrderItem[];
  addItemToOrder: (item: OrderItem) => void;
  removeItemFromOrder: (index: number) => void;
  resetOrderItems: () => void;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const addItemToOrder = (item: OrderItem) => {
    setOrderItems((prevItems) => [...prevItems, item]);
  };

  const removeItemFromOrder = (index: number) => {
    setOrderItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const resetOrderItems = () => {
    setOrderItems([]);
  };

  return (
    <OrderContext.Provider value={{ orderItems, addItemToOrder, removeItemFromOrder, resetOrderItems }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};