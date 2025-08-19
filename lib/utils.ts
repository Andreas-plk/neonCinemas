import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Stripe, loadStripe } from '@stripe/stripe-js';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MinToHours=(min:number)=>{
  const hours = Math.floor(min/60);
  const minutes = min%60;
  return `${hours}h${minutes}m`;
}

export const getYouTubeEmbedUrl=(url: string): string | null =>{
    return `https://www.youtube.com/embed/${url}`;

}

let stripePromise: Promise<Stripe | null>;
export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    }
    return stripePromise;
};



export const convertToSubcurrency=(amount:number) =>{
    return Math.round(amount*100);
}

export const indexToString=(rowIndex:number) =>{
    if (rowIndex>25) rowIndex+=6;
    return  String.fromCharCode(65 + rowIndex);
}