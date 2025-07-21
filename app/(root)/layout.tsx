import React from 'react'
import Navbar from "@/components/navbar";

const Layout = ({
                    children,
                }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <main>
            <Navbar/>
            {children}
        </main>
    )
}
export default Layout
