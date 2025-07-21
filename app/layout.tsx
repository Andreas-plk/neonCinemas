import type { Metadata } from "next";
import { Montserrat} from "next/font/google";
import "./globals.css";



const montserratSans = Montserrat({
    variable: "--font-montserrat",
    weight:"500",
    subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "NeonCinema",
  description: "Where stories shine brighter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserratSans.className}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
