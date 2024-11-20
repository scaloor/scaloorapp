"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenu,
    SidebarGroupLabel,
    SidebarHeader,
} from "@/app/_components/ui/sidebar"
import { Calendar, Home, Inbox, PackageSearch, Search, Settings } from "lucide-react"


// Menu items.
const items = [
    {
        title: "Products",
        url: "/products",
        icon: PackageSearch,
    },
    {
        title: "Orders",
        url: "/orders",
        icon: Inbox,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
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
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
