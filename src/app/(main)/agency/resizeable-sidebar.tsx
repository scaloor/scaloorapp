'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/app/_components/ui/resizable"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/_components/ui/tooltip"
import { cn } from "@/lib/utils";
import Nav from "./nav";
import { Compass, Filter, LayoutDashboard, Settings } from "lucide-react";
import { useState } from "react";
import { Business } from "@/server/db/types";
import { AspectRatio } from "@/app/_components/ui/aspect-ratio";
import Image from "next/image";
import { Separator } from "@/app/_components/ui/separator";
import Link from "next/link";

interface ResizableSidebarProps {
    children: React.ReactNode
    business: Business
}

export function ResizableSidebar({ children, business }: ResizableSidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const defaultLayout = [265, 440, 655]
    const navCollapsedSize = 4;

    let sidebarLogo = business?.businessLogo || "/assets/scaloor_cropped.jpg";

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
                    {!isCollapsed &&
                        <div className="pt-6 ml-4">
                            <AspectRatio ratio={16 / 5}
                                className="pt-6">
                                <Image
                                    src={sidebarLogo}
                                    alt={'Sidebar Logo'}
                                    fill
                                    className='rounded-md object-contain' />
                            </AspectRatio>
                            <div className='w-full my-4 flex items-center text-left gap-2'>
                                <Compass />
                                <div className='flex flex-col'>
                                    {business.name}
                                    <span className='text-muted-foreground'>
                                        {business.address}
                                    </span>
                                </div>
                            </div>
                            <p className='text-muted-foreground text-xs mb-2'>
                                Account Options
                            </p>
                            <Separator className='mb-4' />
                        </div>
                    }

                    <div className="grid grid-rows-3 h-screen">
                        {!!isCollapsed &&
                            <div className="py-6 justify-start">
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <Link href='/'>
                                            <AspectRatio ratio={16 / 8}
                                                className="pt-6">
                                                <Image
                                                    src={sidebarLogo}
                                                    alt={'Sidebar Logo'}
                                                    fill
                                                    className='rounded-md object-contain' />
                                            </AspectRatio>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="flex items-center gap-4">
                                        {business.name}
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        }
                        <div className={cn("justify-center items-center", !!isCollapsed && "flex")}>
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
                        </div>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                    {children}
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>

    )
}