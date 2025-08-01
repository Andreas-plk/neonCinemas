import React from 'react'
import Link from "next/link";
import Image from "next/image";

const Layout = ({
                    children,
                }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
       <main className="gradient-bg overflow-hidden">
           <div className="flex flex-col justify-between items-center">
                <Link href={"/"}><Image className=" mt-5 md:mt-15 glow" src={"/noBgColor.png"} alt={"logo"} width={400} height={400} /></Link>
               {children}
            </div>

       </main>

    )
}
export default Layout
