"use client"

import { ColumnDef } from "@tanstack/react-table"

import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Button } from "@/app/_components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/app/_components/ui/dropdown-menu";
import { ExternalLinkIcon, MoreHorizontalIcon } from "lucide-react";
import { Checkout } from "./sample-checkouts";
import Link from "next/link";

export const checkoutColumns: ColumnDef<Checkout>[] = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            return (
                <div>
                    <Image
                        src={row.original.image}
                        alt={`${row.original.product} image`}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                    />
                </div>
            )
        }
    },
    {
        accessorKey: "product",
        header: "Product Name",
    },
    {
        accessorKey: "upsell",
        header: "Upsell",
        cell: ({ row }) => {
            return (
                <div>
                    {
                        row.original.upsell ? (
                            <Link
                                href={`/checkout/${row.original.upsell!.id}`}
                                className="flex items-center text-blue-600 hover:underline"
                            >
                                {row.original.upsell!.name} <ExternalLinkIcon className="ml-1 h-4 w-4" />
                            </Link>
                        ) : (
                            "N/A"
                        )
                    }
                </div>
            )
        }

    },
    {
        accessorKey: "downsell",
        header: "Downsell",
        cell: ({ row }) => {
            return (
                <div>
                    {
                        row.original.downsell ? (
                            <Link
                                href={`/checkout/${row.original.downsell!.id}`}
                                className="flex items-center text-blue-600 hover:underline"
                            >
                                {row.original.downsell!.name} <ExternalLinkIcon className="ml-1 h-4 w-4" />
                            </Link>
                        ) : (
                            "N/A"
                        )
                    }
                </div>
            )
        }
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "lastModified",
        header: "Last Modified",
        cell: ({ row }) => {
            return (
                <div>
                    {formatDate(row.original.lastModified)}
                </div>
            )
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Preview</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    }
]