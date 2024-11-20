"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { formatPriceToString } from "@/lib/utils"
import { Button } from "@/app/_components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/app/_components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontalIcon, PackageIcon } from "lucide-react"
import { SelectCheckout } from "@/server/db/schema"
import { toast } from "sonner"
import { parseISO, format } from 'date-fns'
import { deleteFile } from "@/lib/supabase/client"

function formatDate(dateString: string) {
    const date = parseISO(dateString)
    return format(date, 'PPp')
}

const deleteCheckout = async (checkoutId: string, thumbnail: string | null) => {
    // Delete the thumbnail from the bucket if it exists
    if (thumbnail) {
        const { error: fileError } = await deleteFile(thumbnail)
        if (fileError) {
            return toast.error(fileError.message)
        }
    }
    
    // TODO: Add deleteCheckoutByIdAction
    // const { error: checkoutError } = await deleteCheckoutByIdAction(checkoutId)
    // if (checkoutError) {
    //     return toast.error(checkoutError.message)
    // }

    toast.success("Checkout deleted successfully")
    window.location.reload()
}

export const columns: ColumnDef<SelectCheckout>[] = [
    {
        accessorKey: "thumbnail",
        header: "Thumbnail",
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.thumbnail ? (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/scaloor-bucket/${row.original.thumbnail}`}
                            alt={row.original.productName}
                            width={50}
                            height={50}
                        />
                    ) : (
                        <div className="w-10 h-10 text-muted-foreground" title={`No thumbnail available for ${row.original.productName}`}>
                            <PackageIcon />
                        </div>
                    )}
                </div>
            )
        }
    },
    {
        accessorKey: "productName",
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
        accessorKey: "productPrice",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        enableSorting: true,
        cell: ({ row }) => {
            return (
                <div>
                    {formatPriceToString(row.original.productPrice * 100)}
                </div>
            )
        }
    },
    /* { This will be added back in when we have a billing type
        accessorKey: "billingType",
        header: "Billing Type",
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {row.original.billingType}
                </div>
            )
        }
    }, */
    {
        accessorKey: "updatedAt",
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
                    {formatDate(row.original.updatedAt)}
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
                            <a href={`/products/${row.original.id}`}>
                                <DropdownMenuItem>
                                    Edit
                                </DropdownMenuItem>
                            </a>
                            <DropdownMenuItem onClick={() => { deleteCheckout(row.original.id, row.original.thumbnail) }}>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    }
]
