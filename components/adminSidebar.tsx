import {
    Sidebar,
    SidebarContent,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home,Film ,TicketPercent,Tickets,LogOut} from "lucide-react"

const AdminSidebar = () => {

    const items = [
        {
            title: "Home",
            url: "/admin/dashboard",
            icon: Home,
        },
        {
            title: "Movies",
            url: "/admin/dashboard/movies/",
            icon: Film,
        },
        {
            title: "Tickets",
            url: "/admin/dashboard/tickets/",
            icon: Tickets,
        },
        {
            title: "Vouchers",
            url: "/admin/dashboard/vouchers",
            icon: TicketPercent,
        },
        {
            title: "Logout",
            url: "/",
            icon: LogOut,
        }

    ]
    return (
        <Sidebar
        collapsible="icon">

            <SidebarContent>
                <SidebarGroup />
                <SidebarGroupLabel>
                    Actions
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>

                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>

        </Sidebar>
    )
}
export default AdminSidebar
