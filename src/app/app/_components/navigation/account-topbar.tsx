'use client';
import { Button } from '@/app/_components/ui/button'
import { cn } from '@/lib/utils'
import { Home } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense } from 'react'
import Breadcrumbs from './breadcrumbs'
import { ModeToggle } from '@/app/_components/common/mode-toggle'
import { useAccountNavigation } from './navigation-provider'

export default function AccountTopbar({ children }: { children: React.ReactNode }) {
    const { isOpen } = useAccountNavigation()
    // There should be notification logic here

    return (
        <Suspense fallback={<div>Loading...</div>}>
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
                        <div>
                            {/* WIP: Notifications */}
                            <ModeToggle />
                        </div>
                    </div>
                </div>
                <div className='px-4'>
                    {children}
                </div>
            </div>
        </Suspense>
    )
}