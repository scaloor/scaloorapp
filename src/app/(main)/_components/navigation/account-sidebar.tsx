'use client';
import { Avatar, AvatarFallback } from '@/app/_components/ui/avatar'
import { Button } from '@/app/_components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/app/_components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/_components/ui/tooltip';
import { signOut } from '@/server/actions/auth/sign-out';
import { ChevronFirst, ChevronLast, Filter, LayoutDashboard, LucideIcon, MoreVertical } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { NavigationBar } from './navigation-bar';


const SidebarItems = [
    {
        text: 'Account',
        icon: <LayoutDashboard />,
        href: '/account'
    },
    {
        text: 'Funnels',
        icon: <Filter />,
        href: '/account/funnel',
    },
]

type AccountSidebarProps = {
    first_name: string,
    last_name: string,
}

export default function AccountSidebar({ first_name, last_name }: AccountSidebarProps) {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(true)
    const isPath = pathname.includes
    return (
        <>
            <aside className='h-screen max-w-60'>
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
                                <Link key={item.text} href={item.href}>
                                    <li
                                        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors
                              ${pathname === item.href ? 'bg-primary text-white hover:bg-green-400' : 'hover:bg-green-400 '}`}>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                {item.icon}
                                            </TooltipTrigger>
                                            {!isOpen && (
                                                <TooltipContent>
                                                    {item.text}
                                                </TooltipContent>
                                            )}
                                        </Tooltip>
                                        <span className={`overflow-hidden transition-all ${isOpen ? 'w-52 ml-3' : 'w-0'}`}>{item.text}</span>
                                    </li>
                                </Link>
                            ))}
                        </TooltipProvider>
                    </ul>


                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex p-3 border-t items-center'>
                            <>
                                <Avatar>
                                    <AvatarFallback>{first_name[0].toLocaleUpperCase()}{last_name[0].toLocaleUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className={`flex justify-between items-center overflow-hidden transition-all leading-4 ${isOpen ? 'w-52 ml-3 ' : 'w-0'}`}>
                                    <div>
                                        <p className='font-semibold text-start'>{first_name} {last_name}</p>
                                    </div>
                                    <MoreVertical size={20} />
                                </div>
                            </>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Account</DropdownMenuLabel>
                            <DropdownMenuItem>Account Details</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => signOut()}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>

                    </DropdownMenu>
                </nav>
            </aside>
            <NavigationBar isOpen={isOpen} />
        </>
    )
}