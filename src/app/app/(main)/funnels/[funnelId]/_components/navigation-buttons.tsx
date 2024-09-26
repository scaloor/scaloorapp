'use client'

import { Button } from "@/app/_components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

type NavigationButtonsProps = {
    funnelId: string
}

export default function NavigationButtons({ funnelId }: NavigationButtonsProps) {
    const pathname = usePathname()
    const currentTab = pathname.split('/').pop() || 'general'

    return (
        <div className="flex gap-4">
            <Link href={`/funnels/${funnelId}`}>
                <Button
                    className={cn(currentTab !== 'settings' ? 'bg-zinc-200' : '')}
                    variant="ghost"
                >
                    General
                </Button>
            </Link>
            <Link href={`/funnels/${funnelId}/settings`}>
                <Button
                    className={cn(currentTab === 'settings' ? 'bg-zinc-200' : '')}
                    variant="ghost"
                >
                    Settings
                </Button>
            </Link>
        </div>
    )
}