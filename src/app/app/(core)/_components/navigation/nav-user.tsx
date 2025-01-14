"use client"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/app/_components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ChevronsUpDown, Sparkles, BadgeCheck, CreditCard, Bell, LogOut } from "lucide-react";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { useAppStore } from "../stores/app-store";

function NavUserSkeleton() {
    return (
        <div className="flex items-center gap-2">
            {/* Avatar skeleton */}
            <Skeleton className="h-8 w-8 rounded-lg" />
            {/* User info skeleton */}
            <div className="grid gap-1">
                <Skeleton className="h-4 w-24" /> {/* Name */}
                <Skeleton className="h-3 w-32" /> {/* Email */}
            </div>
            {/* Chevron icon skeleton */}
            <Skeleton className="h-4 w-4 ml-auto" />
        </div>
    )
}

export function NavUser() {
    const { isMobile } = useSidebar();
    const { user, isLoading } = useAppStore()
    if (isLoading || !user) {
        return <NavUserSkeleton />
    }
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user?.image || ""} alt={user?.firstName || ""} />
                                <AvatarFallback className="rounded-lg">{user?.firstName?.charAt(0) || ""}{user?.lastName?.charAt(0) || ""}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user?.firstName} {user?.lastName}</span>
                                <span className="truncate text-xs">{user?.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-white shadow-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user?.image || ""} alt={user?.firstName || ""} />
                                    <AvatarFallback className="rounded-lg">{user?.firstName?.charAt(0) || ""}{user?.lastName?.charAt(0) || ""}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user?.firstName} {user?.lastName}</span>
                                    <span className="truncate text-xs">{user?.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100">
                                <Sparkles className="size-4" />
                                <span>Upgrade to Pro</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100">
                                <BadgeCheck className="size-4" />
                                <span>Account</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100">
                                <CreditCard className="size-4" />
                                <span>Billing</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100">
                                <Bell className="size-4" />
                                <span>Notifications</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />
                        <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100">
                            <LogOut className="size-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
