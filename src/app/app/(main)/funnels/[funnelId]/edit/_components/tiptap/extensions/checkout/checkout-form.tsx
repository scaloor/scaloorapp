'use client'
import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'
import { formatPrice } from '@/lib/utils'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'
import Image from 'next/image'

type CheckoutFormFields = {
    name: boolean
    email: boolean
    phone: boolean
    address: boolean
}

type CheckoutFormProps = {
    productName: string
    price: number
    productImage?: string
    fields: CheckoutFormFields
}

export default function CheckoutForm({ productName, price, productImage, fields }: CheckoutFormProps) {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <form
            id='payment-form'
            onSubmit={handleSubmit}
            className='flex flex-col gap-4 max-w-md mx-auto'
        >
            <div>
                <h2>{productName}</h2>
                <p>{formatPrice(price)}</p>
                {productImage && <Image src={productImage} alt={productName} width={100} height={100} />}
            </div>
            <div className='flex flex-col gap-2'>
                {fields.name && <Input type='text' placeholder='Name' />}
                {fields.email && <Input type='email' placeholder='Email' />}
                {fields.phone && <Input type='tel' placeholder='Phone' />}
                {fields.address && (
                    <>
                        <Input type='text' placeholder='Address' />
                        <Input type='text' placeholder='City' />
                        <Input type='text' placeholder='State' />
                        <Input type='text' placeholder='Zip' />
                        <Input type='text' placeholder='Country' />
                    </>
                )}
            </div>
            <PaymentElement />
            <Button>Submit</Button>
        </form>
    )
}