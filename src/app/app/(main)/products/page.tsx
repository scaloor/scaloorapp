import React from 'react'
import { DataTable } from '@/app/_components/ui/data-table'
import { sampleProducts } from './_components/sample-products'
import { columns } from './_components/product-columns'
import { Button } from '@/app/_components/ui/button'
import Link from 'next/link'
import { getAuthUserDetails } from '@/server/actions/protected/users'
import ErrorPage from '@/app/_components/common/error-page'
import { productPageAction } from '@/server/actions/protected/product'

type Props = {}

export default async function ProductPage({ }: Props) {
    const { products, error } = await productPageAction()
    if (error || !products) return <ErrorPage errorMessage={error || 'Cannot find products'} />

    return (
        <div>
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Products</h1>
                <Button size="sm" asChild>
                    <Link href="/products/create">Create New Product</Link>
                </Button>
            </div>
            <div className="w-full h-px bg-gray-200 mb-4"></div>
            <DataTable columns={columns} data={products} />
        </div>
    )
}