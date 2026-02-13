import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatters() {
  return {
    currency: (value: number, currency = 'BRL') => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency,
      }).format(value)
    },
    
    date: (date: Date | string) => {
      const d = typeof date === 'string' ? new Date(date) : date
      return new Intl.DateTimeFormat('pt-BR').format(d)
    },
    
    datetime: (date: Date | string) => {
      const d = typeof date === 'string' ? new Date(date) : date
      return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(d)
    }
  }
}
