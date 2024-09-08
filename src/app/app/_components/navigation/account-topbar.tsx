'use client';
import { Button } from '@/app/_components/ui/button'
import { cn } from '@/lib/utils'
import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Breadcrumbs from './breadcrumbs'
import { ModeToggle } from '@/app/_components/common/mode-toggle'
import { useAccountNavigation } from './navigation-provider'



type AccountTopbarProps = {
    children: React.ReactNode
}

export default function AccountTopbar({ children }: AccountTopbarProps) {
    const { isOpen } = useAccountNavigation()
    // There should be notification logic here

    return (
        <div className='w-full'>
            <div
                className={cn(
                    'flex h-14 lg:h-[55px] items-center gap-4 px-3 w-full transition-all',
                    isOpen ? 'left-[307px]' : 'left-20'
                )}
            >
                <div className='flex justify-between items-center w-full'>
                    <div>
                        <Breadcrumbs />
                    </div>
                    {/* WIP: Notifications */}
                    <ModeToggle />
                </div>
            </div>
            {children}
        </div>
    )
}