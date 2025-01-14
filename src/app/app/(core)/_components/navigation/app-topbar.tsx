import { Separator } from '@/app/_components/ui/separator'
import { SidebarTrigger } from '@/app/_components/ui/sidebar'
import React from 'react'
import OrganizationSwitcher from './organization-switcher'
import { Button } from '@/app/_components/ui/button'
import { Plus } from 'lucide-react'



export function AppTopbar() {

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
            <div className="flex justify-between w-full">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <div className="flex items-center gap-2">
                        <OrganizationSwitcher />
                        {/* Will add the ability to change between offers here */}
                    </div>
                </div>
                {/* <div className="flex items-center gap-2 px-4">
                    <Button className="h-8 rounded-xl" variant="link">
                        Switch To Affiliate Mode
                    </Button>
                </div> */}
            </div>
        </header>
    )
}