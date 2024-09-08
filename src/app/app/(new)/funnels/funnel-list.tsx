'use client'
import React from 'react'
import { sampleFunnels } from './sampleFunnels'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/_components/ui/card'
import { Badge } from '@/app/_components/ui/badge'
import { EllipsisVertical, Pencil, Trash } from 'lucide-react'
import { Button } from '@/app/_components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/_components/ui/tooltip'
import Link from 'next/link'
import { toast } from 'sonner'

export default function FunnelList() {
    const getTimeSinceEdit = (date: Date) => {
        const now = new Date()
        const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24))
        return diffInDays === 0 ? 'Today' : `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    }

    const deleteFunnel = async (funnelId: string) => {
        toast('Funnel deleted', {
            description: funnelId
        })
    }

    return (
        <TooltipProvider>
            <div className="grid grid-cols-1 gap-2 max-w-2xl mx-auto">
                {sampleFunnels.map((funnel, index) => (
                    <Link href={`/funnels/fun_a5cwwutxmg31g6uxzgj9j518`} key={index}> {/* TODO: if the funnel hasnt been published, go straight to edit */}
                        <Card className="w-full group py-2 transition-all duration-200 hover:shadow-md hover:bg-gray-100 dark:hover:bg-zinc-800">
                            <div className="flex justify-between items-center px-4">
                                <div className="flex-grow">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <CardTitle className="text-sm font-medium">{funnel.name}</CardTitle>
                                        <Badge variant={funnel.published ? 'default' : 'secondary'}>
                                            {funnel.published ? 'Published' : 'Draft'}
                                        </Badge>
                                    </div>
                                    <CardDescription className="text-xs">Last edited {getTimeSinceEdit(funnel.lastModified)}</CardDescription>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out flex">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="sm" className="text-sm text-slate-700 p-1">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Edit</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="sm" onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                deleteFunnel(funnel.name)
                                            }} className="text-sm text-red-500 dark:text-red-400 p-1">
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Delete</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="sm" className="text-sm text-slate-700 p-1">
                                                <EllipsisVertical className="w-4 h-4" />
                                            </Button>
                                        </TooltipTrigger>
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