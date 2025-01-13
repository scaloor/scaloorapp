"use client"
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '@/app/_components/ui/dropdown-menu'
import { ChevronsUpDown } from 'lucide-react'
import React from 'react'

type OrganizationSwitcherProps = {}

export default function OrganizationSwitcher({ }: OrganizationSwitcherProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                    <span className="text-sm font-semibold text-muted-foreground">
                        Organization Name
                    </span>
                    <ChevronsUpDown className="ml-auto size-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <span>Organization Name</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}