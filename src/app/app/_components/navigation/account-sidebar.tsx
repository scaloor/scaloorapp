'use client';
import { Button } from '@/app/_components/ui/button'
import { Filter, Globe, LayoutDashboard, PackageSearch, Settings } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { cn } from '@/lib/utils';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Profile from './profile';
import { useAccountNavigation } from './navigation-provider';


const sidebarOptions = [
    {
        name: 'Dashboard',
        icon: <LayoutDashboard className='w-4 h-4' />,
        href: '/dashboard'
    },
    {
        name: 'Funnels',
        icon: <Filter className='w-4 h-4' />,
        href: '/funnels',
    },
    {
        name: 'Products',
        icon: <PackageSearch className='w-4 h-4' />,
        href: '/products',
    },
    {
        name: 'Domains',
        icon: <Globe className='w-4 h-4' />,
        href: '/domains',
    },
    {
        name: 'Settings',
        icon: <Settings className='w-4 h-4' />,
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
    const [isHovered, setIsHovered] = useState(false)

    return (
        <>
            <div
                className={cn(
                    "lg:block hidden border-r h-screen fixed top-0 left-0",
                    !isOpen && 'border-none bg-transparent',
                    isOpen && 'w-64'
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex h-full max-h-screen flex-col gap-2 justify-between">
                    <div className="flex h-[55px] items-center justify-between px-3 w-full">
                        <Link className={`flex items-center gap-2 font-semibold ml-1 overflow-hidden transition-all ${isOpen ? 'w-32' : 'w-0'}`} href="/">
                            <span className="text-slate-700 dark:text-white">Scaloor</span>
                        </Link>
                        <Button
                            variant='ghost'
                            className={`transition-opacity duration-300 ${isHovered || !isOpen ? 'opacity-100' : 'opacity-0'}`}
                            size='sm'
                            onClick={toggleOpen}
                        >
                            <HamburgerMenuIcon />
                        </Button>
                    </div>
                    <div className="flex-1 overflow-auto items-center justify-center">
                        <nav className={cn("grid text-sm text-slate-700 p-2 font-medium", !isOpen && 'hidden')}>
                            {sidebarOptions.map((option, index) => (
                                <Link
                                    className={cn("flex items-center gap-2 p-1 max-w-[240px] rounded-lg transition-all hover:bg-zinc-200 hover:dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-50",)}
                                    href={option.href}
                                    key={index}
                                >
                                    <div className="flex items-center">
                                        {option.icon}
                                        <span className='ml-2'>{option.name}</span>
                                    </div>
                                </Link>
                            ))}
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