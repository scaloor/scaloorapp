'use client'

import { NodeViewWrapper } from '@tiptap/react'
import React, { useEffect, useState } from 'react'
import { Stripe, loadStripe } from '@stripe/stripe-js'
import { useFunnelEditor } from '../../../editor-provider'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './checkout-form'
import { checkoutAction, getStripePK } from '@/server/actions/api/editor/checkout'

type CheckoutPageProps = {}

export default function CheckoutComponent({ }: CheckoutPageProps) {
    const [stripePromise, setStripePromise] = useState<Stripe | null | Promise<Stripe | null>>(null)
    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const { state, dispatch } = useFunnelEditor();

    if (!state.previewMode) {
        useEffect(() => {
            const loadStripePromise = async () => {
                const { stripePK } = await getStripePK() // Can probably change stripePK to next_public
                const promise = await loadStripe(stripePK!, { stripeAccount: 'acct_1Pq0p5PPUP2vo0Tr' });
                setStripePromise(promise);
            };
            loadStripePromise();
        }, []);

        useEffect(() => {
            checkoutAction()
                .then(async ({ clientSecret }) => {
                    if (clientSecret) setClientSecret(clientSecret)
                    console.log('clientSecret', clientSecret)                    
                })
                .catch((error) => console.error(error))
        }, [])
    }

    if (!clientSecret || !stripePromise) return null

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
        <NodeViewWrapper className="no-drag-handle">
            <div contentEditable={false} >
                {stripePromise && clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm
                            productName='Epic Product'
                            price={42069}
                            fields={defaultCheckoutFormFields}
                        />
                    </Elements>
                )}
            </div>
        </NodeViewWrapper>
    )
}