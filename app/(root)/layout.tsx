import React from 'react'
import Navbar from "@/components/navbar";
import {auth} from "@/auth";

const Layout =async ({
                    children,
                }: Readonly<{
    children: React.ReactNode;
}>) => {
    const session=await auth();
    return (
        <main>
            <Navbar session={session}/>
            {children}
        </main>
    )
}
export default Layout
