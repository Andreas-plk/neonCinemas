'use client'
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import AdminSidebar from "@/components/adminSidebar";




const Layout = ({
                         children,
                     }: Readonly<{
    children: React.ReactNode;
}>) =>

{

    return (
        <SidebarProvider defaultOpen={false}>
            <AdminSidebar />
            <SidebarTrigger variant="ghost" className="cursor-pointer m-2" />
            <main className="px-6 md:px-12 lg:px-20 py-10 md:py-20 w-full">

                {children}
            </main>
        </SidebarProvider>
    )
}
export default Layout
