"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image";
import { formatPriceToString } from "@/lib/utils";
import { Button } from "@/app/_components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/app/_components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontalIcon, PackageIcon } from "lucide-react";
import { SelectProduct } from "@/server/db/schema";
import { deleteProductByIdAction } from "@/server/actions/api/product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { parseISO, format } from 'date-fns'
import { deleteFile } from "@/lib/supabase/client";

function formatDate(dateString: string) {
    const date = parseISO(dateString)
    return format(date, 'PPp') // e.g., "September 19th, 2024"
}


const deleteProduct = async (productId: string, router: AppRouterInstance, image: string | null) => {
    // Delete the image from the bucket
    if (image) {
        const { error: fileError } = await deleteFile(image)
        if (fileError) {
            return toast.error(fileError.message)
        }
    }
    // Delete the product
    const { error: productError } = await deleteProductByIdAction(productId)
    if (productError) {
        return toast.error(productError.message)
    }

    toast.success("Product deleted successfully")
    router.refresh()

}

export const columns: ColumnDef<SelectProduct>[] = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.image ? (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/scaloor-bucket/${row.original.image}`}
                            alt={row.original.name}
                            width={50}
                            height={50}
                        />
                    ) : (
                        <div className="w-10 h-10 text-muted-foreground" title={`No image available for ${row.original.name}`}>
                            <PackageIcon />
                        </div>
                    )}
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
                    {formatPriceToString(row.original.defaultPrice)}
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
                    {formatDate(row.original.updatedAt)}
                </div>
            )
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const router = useRouter();
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
                            <DropdownMenuItem onClick={() => { router.push(`/products/${row.original.id}/edit`) }}>
                                Edit
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem>
                                Duplicate
                            </DropdownMenuItem> */}
                            <DropdownMenuItem onClick={() => { deleteProduct(row.original.id, router, row.original.image) }}>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    }
]