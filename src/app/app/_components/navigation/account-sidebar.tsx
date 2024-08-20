'use client';
import { Avatar, AvatarFallback } from '@/app/_components/ui/avatar'
import { Button } from '@/app/_components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/app/_components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/_components/ui/tooltip';
import { signOut } from '@/server/actions/auth/sign-out';
import { ChevronFirst, ChevronLast, CircleUser, Filter, LayoutDashboard, LucideIcon, MoreVertical, Settings } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { cn } from '@/lib/utils';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Profile from './profile';
import { useAccountNavigation } from './navigation-provider';


const sidebarOptions = [
    {
        name: 'Dashboard',
        icon: <LayoutDashboard className='' />,
        href: '/dashboard'
    },
    {
        name: 'Account',
        icon: <CircleUser className='' />,
        href: '/account'
    },
    {
        name: 'Funnels',
        icon: <Filter className='' />,
        href: '/funnel',
    },
    {
        name: 'Settings',
        icon: <Settings className='' />,
        href: '/settings'
    },
]

type AccountSidebarProps = {
    firstName: string,
    lastName: string,
    businessName: string,
}

export default function AccountSidebar({ firstName, lastName, businessName }: AccountSidebarProps) {
    const pathname = usePathname()
    const { isOpen, toggleOpen } = useAccountNavigation()
    const isPath = pathname.includes
    return (
        <>
            <div className="lg:block hidden border-r h-full">
                <div className="flex h-full max-h-screen flex-col gap-2 justify-between">
                    <div className="flex h-[55px] items-center justify-between border-b px-3 w-full">
                        <Link className={`flex items-center gap-2 font-semibold ml-1 overflow-hidden transition-all ${isOpen ? 'w-32' : 'w-0'}`} href="/">
                            <span className="">Scaloor</span>
                        </Link>
                        <Button variant='ghost' size='sm' onClick={toggleOpen}>
                            <HamburgerMenuIcon />
                        </Button>
                    </div>
                    <div className="flex-1 overflow-auto py-2 items-center justify-center">
                        <nav className="grid justify-center text-sm font-medium">

                            <TooltipProvider>
                                {sidebarOptions.map((option, index) => (
                                    <Link
                                        className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50", {
                                            "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-900  transition-all hover:text-gray-900 bg-primary dark:text-gray-50 dark:hover:text-gray-50": pathname.includes(option.href)
                                        })}
                                        href={option.href}
                                        key={index}
                                    >
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div className="h-15 w-18">
                                                    {option.icon}
                                                </div>
                                            </TooltipTrigger>
                                            {!isOpen && (
                                                <TooltipContent>
                                                    {option.name}
                                                </TooltipContent>
                                            )}
                                        </Tooltip>
                                        <span className={`overflow-hidden transition-all ${isOpen ? 'w-52 ml-3' : 'w-0'}`}>{option.name}</span>
                                    </Link>
                                ))}
                            </TooltipProvider>

                        </nav>
                    </div>
                    <div>
                        <Profile firstName={firstName} lastName={lastName} businessName={businessName} isOpen={isOpen} />
                    </div>
                </div>
            </div>
        </>
    )
}