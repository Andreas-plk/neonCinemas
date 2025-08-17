import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import AdminSidebar from "@/components/adminSidebar";

const Layout =async ({
                         children,
                     }: Readonly<{
    children: React.ReactNode;
}>) =>

{
    return (
        <SidebarProvider defaultOpen={false}>
            <AdminSidebar />
            <main>
                <SidebarTrigger variant="ghost" className="cursor-pointer"/>
                {children}
            </main>
        </SidebarProvider>
    )
}
export default Layout
