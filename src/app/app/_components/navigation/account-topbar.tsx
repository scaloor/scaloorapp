'use client';
import { cn } from '@/lib/utils'
import Breadcrumbs from './breadcrumbs'
import { ModeToggle } from '@/app/_components/common/mode-toggle'
import { useAccountNavigation } from './navigation-provider'

export default function AccountTopbar({ children }: { children: React.ReactNode }) {
    const { isOpen } = useAccountNavigation()
    // There should be notification logic here

    return (
        <div className={cn('flex-1 transition-all duration-300 ease-in-out', isOpen ? 'ml-64' : 'ml-12')}>
            <div
                className={cn(
                    'fixed flex h-14 w-[calc(100%-3.5rem)] items-center gap-4 px-3 transition-all ease-in-out bg-background z-40',
                    
                )}
            >
                <div className='flex justify-between items-center w-full'>
                    <div>
                        <Breadcrumbs />
                    </div>
                    <div>
                        {/* WIP: Notifications */}
                        {/* <ModeToggle /> */}
                        {/* The top right corner should render page specific actions
                        * So there should be nothing here.
                        */}
                    </div>
                </div>
            </div>
            <div className='px-4 pt-14'>
                {children}
            </div>
        </div>
    )
}