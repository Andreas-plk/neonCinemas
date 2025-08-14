import React from 'react'
import Navbar from "@/components/navbar";
import {auth} from "@/auth";
import {TicketProvider} from "@/context/TicketContext";
import {SessionProvider} from "next-auth/react";

const Layout =async ({
                    children,
                }: Readonly<{
    children: React.ReactNode;
}>) => {
    const session=await auth();
    return (
        <main>
            <SessionProvider session={session}>
                <Navbar/>
                <TicketProvider>{children}</TicketProvider>
            </SessionProvider>

        </main>
    )
}
export default Layout
