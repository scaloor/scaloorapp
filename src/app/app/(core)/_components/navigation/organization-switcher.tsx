"use client"
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '@/app/_components/ui/dropdown-menu'
import { ChevronsUpDown } from 'lucide-react'
import { Suspense, useState } from 'react'
import { Skeleton } from '@/app/_components/ui/skeleton'
import { useAppStore } from '../stores/app-store'

type OrganizationSwitcherProps = {}

export default function OrganizationSwitcher({ }: OrganizationSwitcherProps) {
    const { organizations, isLoading } = useAppStore()
    // TODO: This should eventually be stored in the Store, but for now users can only have one organization.
    const [selectedOrganization, setSelectedOrganization] = useState<number>(0);

    if (isLoading || !organizations) {
        return (
            <Skeleton className="h-8 w-[150px] rounded-lg" />
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                    <span className="text-sm font-semibold text-muted-foreground">
                        {organizations[selectedOrganization].name}
                    </span>
                    <ChevronsUpDown className="ml-auto size-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {organizations.map((organization, index) => (
                    <DropdownMenuItem key={index} onClick={() => setSelectedOrganization(index)}>
                        <span>{organization.name}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}