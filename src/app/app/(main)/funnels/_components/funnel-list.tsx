'use client'
import React from 'react'
import { Card, CardTitle, CardDescription, } from '@/app/_components/ui/card'
import { Badge } from '@/app/_components/ui/badge'
import { EllipsisVertical, Pencil, Trash } from 'lucide-react'
import { Button } from '@/app/_components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/_components/ui/tooltip'
import Link from 'next/link'
import { toast } from 'sonner'
import { SelectFunnel } from '@/server/db/schema'
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu'
import { deleteFunnelAction } from '@/server/actions/protected/funnel'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/app/_components/ui/dialog'
import { DeleteDialog } from './delete-dialog'

type FunnelListProps = {
    funnels: SelectFunnel[]
}

export default function FunnelList({ funnels }: FunnelListProps) {
    const router = useRouter();
    const getTimeSinceEdit = (date: Date) => {
        const now = new Date()
        const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24))
        return diffInDays === 0 ? 'Today' : `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    }

    // TODO: Implement delete funnel
    const deleteFunnel = async (funnelId: string, funnelName: string) => {
        const { error } = await deleteFunnelAction(funnelId)
        if (error) {
            toast.error(error)
            return
        }
        toast('Funnel deleted', {
            description: funnelName
        })
        router.refresh()
    }


    return (
        <TooltipProvider>
            <div className="grid grid-cols-1 gap-2 max-w-2xl mx-auto">
                {funnels.map((funnel, index) => (
                    <Link key={index} href={funnel.published ? `/funnels/${funnel.id}` : `/funnels/${funnel.id}/edit`} >
                        <Card className="w-full group py-2 transition-all duration-200 hover:shadow-md hover:bg-zinc-200 dark:hover:bg-zinc-800">
                            <div className="flex justify-between items-center px-4">
                                <div className="flex-grow">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <CardTitle className="text-sm font-medium">{funnel.name}</CardTitle>
                                        <Badge variant={funnel.published ? 'default' : 'secondary'}>
                                            {funnel.published ? 'Published' : 'Draft'}
                                        </Badge>
                                    </div>
                                    <CardDescription className="text-xs">Last edited {getTimeSinceEdit(new Date(funnel.updatedAt))}</CardDescription>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out flex">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-sm text-slate-700 dark:text-slate-300 p-1"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    // Use router.push instead of Link
                                                    router.push(`/funnels/${funnel.id}/edit`);
                                                }}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Edit</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}>
                                                <DeleteDialog funnelId={funnel.id} funnelName={funnel.name} />
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Delete</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <DropdownMenu>
                                            <TooltipTrigger asChild>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-sm text-slate-700 dark:text-slate-300 p-1"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                        }}
                                                    >
                                                        <EllipsisVertical className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                            </TooltipTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        // Add rename logic here
                                                        console.log('Rename clicked');
                                                    }}
                                                >
                                                    Rename
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        // Add duplicate logic here
                                                        console.log('Duplicate clicked');
                                                    }}
                                                >
                                                    Duplicate
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <TooltipContent>
                                            <p>More</p>
                                        </TooltipContent>
                                    </Tooltip>

                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </TooltipProvider >
    )
}