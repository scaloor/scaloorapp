'use client';
import React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { Funnel } from '@/server/db/types'
import { Button } from '@/app/_components/ui/button';
import { ArrowUpDown, ExternalLink, MoreHorizontal } from 'lucide-react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/app/_components/ui/dropdown-menu';
import Link from 'next/link';
import { Badge } from '@/app/_components/ui/badge';

type FunnelColumnProps = {}

export default function Columns({ }: FunnelColumnProps) {
    return (
        <div>Columns</div>
    )
}

export const columns: ColumnDef<Funnel>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        enableSorting: true,
        cell: ({ row }) => {
            return (
                <Link
                    className="flex gap-2 items-center"
                    href={`/account/funnel/${row.original.id}`}
                >
                    {row.getValue('name')}
                    <ExternalLink size={15} />
                </Link>
            )
        }
    },
    {
        accessorKey: 'updatedAt',
        header: ({ column }) => {
            return (
                <div className='text-right'>
                    <Button
                        variant="ghost"
                        className='text-right'
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Last Updated
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue('updatedAt'));
            return <div className='text-right'>{date.toDateString()} {date.toLocaleTimeString()}</div>
        },
    },
    {
        accessorKey: 'published',
        header: ({ column }) => {
            return (
                <div className='text-right'>
                    Published
                </div>
            )
        },
        cell: ({ row }) => {
            return <div className='text-right'>{row.getValue('published') ? (
                <Badge variant={'default'}>Published</Badge>
            ) : (
                <Badge variant={'destructive'}>Draft</Badge>
            )}</div>
        },
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Visit Funnel</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }

]