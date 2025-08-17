import {
    Sidebar,
    SidebarContent,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home,Film ,TicketPercent,Tickets} from "lucide-react"

const AdminSidebar = () => {

    const items = [
        {
            title: "Home",
            url: "#",
            icon: Home,
        },
        {
            title: "Movies",
            url: "/admin/dashboard/movies/",
            icon: Film,
        },
        {
            title: "Tickets",
            url: "#",
            icon: Tickets,
        },
        {
            title: "Vouchers",
            url: "#",
            icon: TicketPercent,
        },

    ]
    return (
        <Sidebar
        collapsible="icon">

            <SidebarContent>
                <SidebarGroup />
                <SidebarGroupLabel>
                    hello dude
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
