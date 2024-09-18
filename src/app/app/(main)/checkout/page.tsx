'use client'
import { useState, useEffect } from 'react'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Stripe, loadStripe } from '@stripe/stripe-js'
import { checkoutAction, getStripePK } from './action'
import CheckoutForm from './checkout-form'

type CheckoutPageProps = {}

export default function CheckoutPage({ }: CheckoutPageProps) {
    const [stripePromise, setStripePromise] = useState<Stripe | null | Promise<Stripe | null>>(null)
    const [clientSecret, setClientSecret] = useState<string | null>(null)

    // Load stripe promise
    useEffect(() => {
        const loadStripePromise = async () => {
            const { stripePK } = await getStripePK() // Can probably change stripePK to next_public
            const promise = await loadStripe(stripePK, { stripeAccount: 'acct_1Pq0p5PPUP2vo0Tr' });
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

    const defaultCheckoutFormFields = {
        name: true,
        email: true,
        phone: false,
        address: false,
        city: false,
        state: false,
        zip: false,
        country: false,
    }

    return (
        <>
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'flat' } }}>
                    <CheckoutForm
                        productName='Epic Product'
                        price={42069}
                        fields={defaultCheckoutFormFields}
                    />
                </Elements>
            )}
        </>
    )
}