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
  try {
    const parsedUrl = new URL(url);

    // Handle standard "watch" URLs
    if (parsedUrl.hostname.includes('youtube.com') && parsedUrl.pathname === '/watch') {
      const videoId = parsedUrl.searchParams.get('v');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    // Handle shortened "youtu.be" URLs
    if (parsedUrl.hostname === 'youtu.be') {
      const videoId = parsedUrl.pathname.slice(1);
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Already an embed URL
    if (parsedUrl.pathname.startsWith('/embed/')) {
      return url;
    }

    return null;
  } catch (e) {
    return null;
  }
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