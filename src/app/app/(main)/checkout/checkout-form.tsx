'use client'

import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'

type CheckoutFormProps = {}

export default function CheckoutForm({ }: CheckoutFormProps) {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }
    
    return (
        <form id='payment-form' onSubmit={handleSubmit}>
            <PaymentElement />
            <button>Submit</button>
        </form>
    )
}