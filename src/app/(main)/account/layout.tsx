import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/app/_components/ui/separator"
import { Sidebar } from "@/app/_components/common/navigation/sidebar"

const sidebarNavItems = [
    {
        title: "Dashboard",
        href: "/account",
    },
    {
        title: "Customer Management",
        href: "/account/customer",
    },
    {
        title: "Funnels",
        href: "/account/funnel",
    },
    {
        title: "Media",
        href: "/account/media",
    },
    {
        title: "Team",
        href: "/account/team",
    },
    {
        title: "Settings",
        href: "/account/settings",
    },
    {
        title: "Billing",
        href: "/account/billing",
    },
]

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (

        <div className="hidden space-y-6 p-10 pb-16 md:block">
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <Sidebar items={sidebarNavItems} />
                </aside>
                <Separator orientation="vertical" decorative={true}/>
                <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
        </div>

    )
}