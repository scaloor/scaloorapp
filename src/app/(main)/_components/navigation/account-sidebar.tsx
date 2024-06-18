'use client';
import { Avatar, AvatarFallback } from '@/app/_components/ui/avatar'
import { Button } from '@/app/_components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/_components/ui/tooltip';
import { ChevronFirst, ChevronLast, Filter, LayoutDashboard, LucideIcon, MoreVertical } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

type AccountSidebarProps = {
    children: React.ReactNode
}
const SidebarItems = [
    {
        text: 'Dashboard',
        icon: <LayoutDashboard />,
        href: '/account'
    },
    {
        text: 'Funnels',
        icon: <Filter />,
        href: '/account/funnel',
    },
]

export default function AccountSidebar() {
    const pathname = usePathname()
    console.log('Pathname:', pathname)
    const [activeSidebarItem, setActiveSidebarItem] = useState('')
    const [isOpen, setIsOpen] = useState(true)
    return (
        <aside className='h-screen'>
            <nav className='h-full flex flex-col bg-background border-r shadow-sm'>
                <div className='p-4 pb-2 flex justify-between items-center'>
                    <div className={`overflow-hidden transition-all ${isOpen ? 'w-32' : 'w-0'}`}>
                        Scaloor
                    </div>
                    <Button variant='ghost' size='sm' onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <ChevronFirst /> : <ChevronLast />}
                    </Button>
                </div>
                <ul className='flex-1 px-3'>
                    <TooltipProvider>
                        {SidebarItems.map((item) => (
                            <Link href={item.href}>
                                <li key={item.text}
                                    className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors
                              ${pathname === item.href ? 'bg-primary text-white hover:bg-green-400'
                                            : 'hover:bg-green-400 '}`}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            {item.icon}
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {item.text}
                                        </TooltipContent>
                                    </Tooltip>
                                    <span className={`overflow-hidden transition-all ${isOpen ? 'w-52 ml-3' : 'w-0'}`}>{item.text}</span>
                                </li>
                            </Link>
                        ))}
                    </TooltipProvider>
                </ul>


                <div className='border-t flex p-3'>
                    <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className={`flex justify-center items-center overflow-hidden transition-all ${isOpen ? 'w-52 ml-3 ' : 'w-0'}`}>
                        <div>
                            <p className='font-semibold'>John Doe</p>
                            <span className='text-muted-foreground text-xs'>johndoe@example.com</span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    )
}