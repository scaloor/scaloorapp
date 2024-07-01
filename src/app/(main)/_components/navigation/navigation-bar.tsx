import { Button } from '@/app/_components/ui/button'
import { cn } from '@/lib/utils'
import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Breadcrumbs from './breadcrumbs'



type Props = {
    className?: string
    isOpen?: boolean
}

export function NavigationBar({ className, isOpen }: Props) {
    // There should be notification logic here
    return (
        <>
            <div
                className={cn(
                    'fixed z-[20] right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex gap-4 items-center border-b-[1px] transition-all',
                    className,
                    isOpen ? 'left-60' : 'left-20 border-l'
                )}
            >
                <Breadcrumbs />
                {/* WIP: Notifications */}
            </div>
        </>
    )
}