'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/app/_components/ui/resizable"
import { TooltipProvider } from "@/app/_components/ui/tooltip"
import { cn } from "@/lib/utils";
import Nav from "./nav";
import { Filter, LayoutDashboard, Settings } from "lucide-react";
import { useState } from "react";
import { Business } from "@/server/db/types";

interface ResizableSidebarProps {
    children: React.ReactNode
    business: Business
}

export function ResizableSidebar({ children, business }: ResizableSidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const defaultLayout = [265, 440, 655]
    const navCollapsedSize = 4;

    /* console.log(business) */

    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup direction="horizontal"
                onLayout={(sizes: number[]) => {
                    document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                        sizes
                    )}`
                }}
                className="h-full items-stretch"
            >
                <ResizablePanel
                    defaultSize={defaultLayout[0]}
                    collapsedSize={navCollapsedSize}
                    collapsible={true}
                    minSize={15}
                    maxSize={20}
                    onCollapse={() => {
                        setIsCollapsed(!isCollapsed)
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                            !isCollapsed
                        )}`
                    }}
                    onExpand={() => {
                        setIsCollapsed(!isCollapsed)
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                            !isCollapsed
                        )}`
                    }}

                    className={cn(
                        isCollapsed &&
                        "min-w-[50px] transition-all duration-300 ease-in-out"
                    )}>
                    <Nav
                        isCollapsed={isCollapsed}
                        links={[
                            {
                                title: "Dashboard",
                                href: "/account",
                                label: "",
                                icon: LayoutDashboard,
                                variant: "default",
                            },
                            {
                                title: "Funnels",
                                href: "/account/funnel",
                                label: "",
                                icon: Filter,
                                variant: "ghost",
                            },
                            {
                                title: "Settings",
                                href: "/account/settings",
                                label: "",
                                icon: Settings,
                                variant: "ghost",
                            },
                        ]}
                    />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                    {children}
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    )
}