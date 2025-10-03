import React from 'react'
import Navbar from "@/components/navbar";

import {TicketProvider} from "@/context/TicketContext";
import {SessionProvider} from "next-auth/react";
import {auth} from "@/auth";
import ChatBot from "@/components/ChatBot";
import {adminLogout} from "@/app/actions";



const Layout =async ({
                    children,
                }: Readonly<{
    children: React.ReactNode;
}>) =>

{
    return (
        <main>
                <SessionProvider session={await auth()}>
                    <Navbar/>
                    <TicketProvider>{children}</TicketProvider>
                    <ChatBot/>
                </SessionProvider>

        </main>
    )
}
export default Layout
