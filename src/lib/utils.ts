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

export function cleanData(data: any[]) {
  const fieldnames = ['productName', 'size', 'quantity', 'price', 'subTotal', 'total', 'paymentMethod', 'date', 'time'];
    
  const csvRows = [];
  csvRows.push(fieldnames.join(',')); 

  data.forEach(row => {
    const createdAtTimestamp = parseInt(row.created_at) / 1000; // Convertir de milisegundos a segundos
    const createdAtDate = new Date(createdAtTimestamp * 1000);

    const date = createdAtDate.toISOString().split('T')[0];
    const time = createdAtDate.toTimeString().split(' ')[0];
    
    const items = row.items;

    items.forEach((item: any) => {
        const newRow = [
            item.productName,
            item.size,
            item.quantity,
            item.price,
            row.subTotal,
            row.total,
            row.paymentMethod,
            date,
            time
        ].join(',');

        csvRows.push(newRow); 
    });
  });

  return csvRows;
}

export function saveToSummary(data: any[]) {
  return 0;
}