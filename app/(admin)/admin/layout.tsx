import React from "react";

const Layout = async ({
                          children,
                      }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (<main>
        {children}
    </main>)
}
export default Layout;