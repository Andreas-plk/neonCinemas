import type { Metadata } from "next";
import { Montserrat} from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner";



const montserratSans = Montserrat({
    variable: "--font-montserrat",
    weight:"500",
    subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "NeonCinemas",
  description: "Where stories shine brighter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body
        className={`${montserratSans.className}  antialiased`}
      >
        {children}
      <Toaster/>
      </body>
    </html>
  );
}
