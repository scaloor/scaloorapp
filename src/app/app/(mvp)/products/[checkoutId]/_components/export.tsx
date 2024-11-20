import { Card, CardHeader, CardTitle } from '@/app/_components/ui/card'
import React from 'react'

type Props = {}

export default function CheckoutExport({ }: Props) {
  return (
    <Card className='w-full h-[400px]'>
      <CardHeader>
        <CardTitle>CheckoutExport</CardTitle>
      </CardHeader>
    </Card>
  )
}