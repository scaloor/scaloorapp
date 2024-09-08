'use client'
import React from 'react'
import { Button } from '@/app/_components/ui/button'
import Link from 'next/link'
import CheckoutTable from './_components/checkout-table'

type Props = {}

export default function CheckoutsPage({ }: Props) {
  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Checkouts</h1>
        <Button asChild>
          <Link href="/checkouts/create">Create New Checkout</Link>
        </Button>
      </div>
      <CheckoutTable />
    </div>
  )
}