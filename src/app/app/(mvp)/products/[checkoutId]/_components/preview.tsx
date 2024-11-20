'use client'

import { useState, useEffect } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { createPaymentIntent } from '@/server/actions/stripe/payment-intent'
import { toast } from 'sonner'
import { SelectCheckout } from '@/server/db/schema'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '@/app/_components/common/checkout-form'
import { Card, CardContent } from '@/app/_components/ui/card'

type CheckoutPreviewProps = {
    stripeAccountId: string;
    dbCheckout: SelectCheckout;
}

export default function CheckoutPreview({ stripeAccountId, dbCheckout }: CheckoutPreviewProps) {
    const [stripePromise, setStripePromise] = useState<Stripe | null | Promise<Stripe | null>>(null)
    const [clientSecret, setClientSecret] = useState<string | null>(null)

    // Load stripe promise
    // Wrapped in useEffect to prevent infinite re-renders
    useEffect(() => {
        const loadStripePromise = async () => {
            const promise = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!, {
                stripeAccount: stripeAccountId
            })
            setStripePromise(promise)
        }
        loadStripePromise()
    }, [])

    // Create payment intent
    // This will need to be passed to the users-customer via the api
    // The payment intent MUST be created on the server, and passed on the initial checkout load
    useEffect(() => {
        async function getClientSecret() {
            const { clientSecret, error } = await createPaymentIntent(dbCheckout.id)
            if (error || !clientSecret) {
                toast.error(error)
                return;
            }
            setClientSecret(clientSecret)
        }

        getClientSecret()
    }, [])

    return (
        <div className='flex flex-col w-full h-full justify-center items-center'>
            <p className='mb-6'>Checkout Preview</p>
            <Card className='w-full'>
                <CardContent>
                    {stripePromise && clientSecret && (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <CheckoutForm dbCheckout={dbCheckout} />
                        </Elements>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}