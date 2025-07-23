import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MinToHours=(min:number)=>{
  const hours = Math.floor(min/60);
  const minutes = min%60;
  return `${hours}h${minutes}m`;
}
