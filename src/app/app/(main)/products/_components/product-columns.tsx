"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Product } from "./sample-products";
import Image from "next/image";
import { formatDate, formatPrice } from "@/lib/utils";
import { Button } from "@/app/_components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/app/_components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontalIcon } from "lucide-react";

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            return (
                <div>
                    <Image
                        src={row.original.image}
                        alt={row.original.name}
                        width={50}
                        height={50}
                    />
                </div>
            )
        }
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Product Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        enableSorting: true,
    },
    {
        accessorKey: "defaultPrice",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Default Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        enableSorting: true,
        cell: ({ row }) => {
            return (
                <div>
                    {formatPrice(row.original.defaultPrice)}
                </div>
            )
        }
    },
    {
        accessorKey: "lastModified",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Last Modified
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        enableSorting: true,
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
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    }
]