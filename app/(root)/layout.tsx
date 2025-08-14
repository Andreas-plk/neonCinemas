import React from 'react'
import Navbar from "@/components/navbar";
import {auth} from "@/auth";
import {TicketProvider} from "@/context/TicketContext";

const Layout =async ({
                    children,
                }: Readonly<{
    children: React.ReactNode;
}>) => {
    const session=await auth();
    return (
        <main>
            <Navbar session={session}/>
            <TicketProvider>{children}</TicketProvider>
        </main>
    )
}
export default Layout
