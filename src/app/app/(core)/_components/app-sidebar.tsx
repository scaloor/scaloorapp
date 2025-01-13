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
    SidebarMenuSubItem,
} from "@/app/_components/ui/sidebar"
import { CreditCard, Home, Inbox, PackageSearch, Settings } from "lucide-react"
import { usePathname } from "next/navigation"
import { NavUser } from "./nav-user"


// Menu items.
const items = {
    main: [
        {
            title: "Home",
            url: "/dashboard",
            icon: Home,
        },
        {
            title: "Offers",
            url: "/offers",
            icon: PackageSearch,
        },
        {
            title: "Orders",
            url: "/orders",
            icon: Inbox,
        }
    ],
    settings: [
        {
            title: "Settings",
            url: "/settings",
            icon: Settings,
        },
        {
            title: "Billing",
            url: "/billing",
            icon: CreditCard,
        }
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                                    <span className="text-primary-foreground font-semibold">S</span>
                                </div>
                                <h2 className="text-2xl font-semibold font-plus-jakarta">
                                    Scaloor
                                </h2>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.main.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                    >
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
                <SidebarGroup>
                    <SidebarGroupLabel>Settings</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.settings.map((item) => (
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
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
