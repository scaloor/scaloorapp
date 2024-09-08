'use client'
import React, { useState } from 'react'
import { DataTable } from '@/app/_components/ui/data-table'
import { checkoutColumns } from './checkouts-columns'
import { checkouts } from './sample-checkouts'
import { Checkout } from '@/app/app/(business)/checkouts/_components/sample-checkouts'

type Props = {}

export default function CheckoutTable({ }: Props) {
    const [selectedProduct, setSelectedProduct] = useState<Checkout | null>(null)
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    const handleProductClick = (productId: number) => {
        const product = checkouts.find(c => c.id === productId)
        if (product) {
            setSelectedProduct(product)
            setIsSheetOpen(true)
        }
    }
    return (
        <div>
            <DataTable columns={checkoutColumns} data={checkouts} />
        </div>
    )
}