import { Button } from '@/app/_components/ui/button'
import { cn } from '@/lib/utils'
import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Breadcrumbs from './breadcrumbs'



type Props = {
    className?: string
}

export function NavigationBar({ className }: Props) {
    // There should be notification logic here





    return (
        <>
            <div
                className={cn(
                    'fixed z-[20] md:left-[300px] left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex gap-4 items-center border-b-[1px] ',
                    className
                )}
            >
                <Breadcrumbs />
                <div className="flex items-center gap-2 ml-auto">
                    <Link href={'/'}>
                        <Button
                            variant={'default'}>
                            Back to Home
                            <Home className='ml-2' />
                        </Button>
                    </Link>
                </div>

            </div>
        </>
    )
}