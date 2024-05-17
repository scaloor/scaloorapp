'use client'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/app/_components/ui/resizable";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { LucideIcon } from "lucide-react"
import {
    AlertCircle,
    Archive,
    ArchiveX,
    File,
    Inbox,
    MessagesSquare,
    Search,
    Send,
    ShoppingCart,
    Trash2,
    Users2,
} from "lucide-react"
import { Separator } from "@/app/_components/ui/separator";
import Nav from "./nav";
import { TooltipProvider } from "@/app/_components/ui/tooltip";

interface MenuBarWrapperProps {
    isLoading: boolean
    isBlocking?: boolean
    productMenu?: ReactNode
    children: ReactNode
}

/* const MenuBarWrapper = ({
    isLoading,
    isBlocking = true,
    productMenu,
    children,
}: MenuBarWrapperProps) => {
    const router = useRouter()
    const selectedProject = useSelectedProject()
    const requiresProjectDetails = !routesToIgnoreProjectDetailsRequest.includes(router.pathname)

    if (!isBlocking) {
        return children
    }

    const showMenuBar =
        !requiresProjectDetails || (requiresProjectDetails && selectedProject !== undefined)

    return !isLoading && productMenu && showMenuBar ? children : null
} */


export default function Layout({ children }: { children: React.ReactNode }) {

    const [isCollapsed, setIsCollapsed] = useState(false);
    const defaultLayout = [265, 440, 655]
    const navCollapsedSize = 4;
    return (
        <section className="flex h-full">
            <TooltipProvider delayDuration={0}>
                <ResizablePanelGroup
                    direction="horizontal"
                    onLayout={(sizes: number[]) => {
                        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                            sizes
                        )}`
                    }}
                    className="flex h-full max-h-[800px] items-stretch"
                >
                    <aside className="">
                        <ResizablePanel
                            defaultSize={defaultLayout[0]}
                            collapsedSize={navCollapsedSize}
                            collapsible={true}
                            minSize={15}
                            maxSize={20}
                            onCollapse={() => {
                                setIsCollapsed(!isCollapsed)
                                document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                                    isCollapsed
                                )}`
                            }}
                            className={cn(
                                isCollapsed &&
                                "min-w-[50px] transition-all duration-300 ease-in-out"
                            )}
                        >
                            <Separator />
                            <Nav
                                isCollapsed={isCollapsed}
                                links={[
                                    {
                                        title: "Inbox",
                                        label: "128",
                                        icon: Inbox,
                                        variant: "default",
                                    },
                                    {
                                        title: "Drafts",
                                        label: "9",
                                        icon: File,
                                        variant: "ghost",
                                    },
                                    {
                                        title: "Sent",
                                        label: "",
                                        icon: Send,
                                        variant: "ghost",
                                    },
                                    {
                                        title: "Junk",
                                        label: "23",
                                        icon: ArchiveX,
                                        variant: "ghost",
                                    },
                                    {
                                        title: "Trash",
                                        label: "",
                                        icon: Trash2,
                                        variant: "ghost",
                                    },
                                    {
                                        title: "Archive",
                                        label: "",
                                        icon: Archive,
                                        variant: "ghost",
                                    },
                                ]} />

                        </ResizablePanel>
                        <ResizableHandle withHandle />
                    </aside>

                    <ResizablePanel className="h-full">
                        <main className="h-full flex flex-col flex-1 w-full overflow-x-hidden">
                            {children}
                        </main>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </TooltipProvider>
        </section >
    );
}