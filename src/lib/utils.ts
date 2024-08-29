import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDate } from "./formats"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterDate(data: any[], now: Date, attribute: string) {
  return data.filter((item) => {
    const itemDate = new Date(item[attribute]);
    return itemDate.getDate() === now.getDate();
  });
}

export function filterMonth(data: any[], date: Date, attribute: string) {
  const targetMonth = date.getMonth();
  const targetYear = date.getFullYear();

  return data.filter((item) => {
    const itemDate = new Date(item[attribute]);
    return itemDate.getMonth() === targetMonth && itemDate.getFullYear() === targetYear;
  });
}

export function filterPaymentMethod(data: any[], value: string, attribute: string){
  return data.filter((item) => {
    return item[attribute] === value;
  })
}

export function calculateAmount(data: any[], attribute: string) {
  return data.reduce((total, item) => total += item[attribute], 0);
}

export function getAllOrders(objetos: any[], attribute: string) {
  return objetos.reduce((acc, objeto) => acc.concat(objeto[attribute]), []);
}