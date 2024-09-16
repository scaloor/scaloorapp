'use client'
import { useState, useEffect } from 'react'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Stripe, loadStripe } from '@stripe/stripe-js'
import { checkoutAction, getStripePromise } from './action'
import CheckoutForm from './checkout-form'

type CheckoutPageProps = {}

export default function CheckoutPage({ }: CheckoutPageProps) {
    const [stripePromise, setStripePromise] = useState<Stripe | null>(null)
    const [clientSecret, setClientSecret] = useState<string | null>(null)

    // Load stripe promise
    useEffect(() => {
        const loadStripePromise = async () => {
            const promise = await loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`);
            console.log('promise', promise)
            setStripePromise(promise);
        };
        loadStripePromise();
    }, []);

    // Create payment intent
    useEffect(() => {
        checkoutAction()
            .then(async ({ clientSecret }) => {
                if (clientSecret) setClientSecret(clientSecret)
                console.log('clientSecret', clientSecret)
            })
            .catch((error) => console.error(error))
    }, [])

    if (!clientSecret) return null

    return (
        <>
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'flat' } }}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    )
}