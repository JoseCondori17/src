import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    currencySign: 'standard',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDateToDateString(date: Date | null): string {
  if (date === null) {
    return 'Error in date'; 
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDate (date: Date): string {
  return format(date, "dd MMM, yyyy", { locale: es });
};

export function formatTime(date: Date): string {
  return format(date, "hh:mm a", { locale: es });
};

