import { Avatar, AvatarFallback } from '@/app/_components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/app/_components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { signOut } from '@/server/actions/public/auth/sign-out'
import { LogOut, Settings, CircleUser } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type ProfileProps = {
    firstName: string,
    lastName: string,
    businessName: string,
    isOpen: boolean,
}

export default function Profile({ firstName, lastName, businessName, isOpen }: ProfileProps) {
    if (!isOpen) return null;

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center overflow-hidden transition-all leading-4 ml-2">
                <p className='font-semibold text-sm text-start'>{businessName}</p>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger className='flex p-3 items-center'>
                    <Avatar>
                        <AvatarFallback>{firstName[0].toLocaleUpperCase()}{lastName[0].toLocaleUpperCase()}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className='w-56'>
                    <DropdownMenuLabel>{firstName[0].toLocaleUpperCase()}{firstName.slice(1).toLocaleLowerCase()} {lastName[0].toLocaleUpperCase()}{lastName.slice(1).toLocaleLowerCase()}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/settings">
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/account">
                        <DropdownMenuItem>
                            <CircleUser className="mr-2 h-4 w-4" />
                            Account
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onSelect={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}