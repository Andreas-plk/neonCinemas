import React from 'react'

const Layout = ({
                    children,
                }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
       <main className="h-screen bg-gradient-to-br from-bg from-20% via-[#2c2c2c] via-55% to-second to-120%">{children}</main>

    )
}
export default Layout
