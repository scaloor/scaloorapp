import { type ClassValue, clsx } from "clsx"
import { format, parseISO } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  const date = parseISO(dateString)
  return format(date, 'PPp') // e.g., "September 19th, 2024"
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Format the price to a string
export function formatPriceToString(price: number) {
  // Convert cents to dollars and format with 2 decimal places
  const dollars = (price / 100).toFixed(2);
  // Add dollar sign and commas for thousands
  return `$${dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

 //Format the price to a number
 export function formatPriceToNumber(priceString: string) {
  // Remove the '$' sign and convert to a float
  const priceFloat = parseFloat(priceString.replace('$', ''));
  // Convert to cents (integer)
  return Math.round(priceFloat * 100);
};


export const createPathname = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};
