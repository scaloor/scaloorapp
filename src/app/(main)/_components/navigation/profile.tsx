import { Avatar, AvatarFallback } from '@/app/_components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/app/_components/ui/dropdown-menu'
import { signOut } from '@/server/actions/auth/sign-out'
import { LogOut, Settings, MoreVertical, User, Receipt } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type ProfileProps = {
    firstName: string,
    lastName: string,
    businessName: string,
    isOpen: boolean,
}

export default function Profile({ firstName, lastName, businessName, isOpen }: ProfileProps) {
    return (
        <div className='flex border-t'>
            <div className={`flex justify-between items-center overflow-hidden transition-all leading-4 ${isOpen ? 'w-52 ml-3 ' : 'w-0'}`}>
                <div>
                    <p className='font-semibold text-start'>{businessName}</p>
                </div>
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
                    <Link href="/account/settings">
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/account/billing">
                        <DropdownMenuItem>
                            <Receipt className="mr-2 h-4 w-4" />
                            Billing
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