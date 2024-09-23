'use client'

import { NodeViewWrapper } from '@tiptap/react'
import React, { useEffect, useState } from 'react'
import { Stripe, loadStripe } from '@stripe/stripe-js'
import { useFunnelEditor } from '../../../editor-provider'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './checkout-form'
import { checkoutAction, getStripePK } from '@/server/actions/api/editor/checkout'

export default function CheckoutComponent() {
    const [stripePromise, setStripePromise] = useState<Stripe | null | Promise<Stripe | null>>(null)
    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const [productName, setProductName] = useState<string | null>(null)
    const [productPrice, setProductPrice] = useState<number | null>(null)
    const { state, dispatch } = useFunnelEditor();

    useEffect(() => {
        const loadStripePromise = async () => {
            const { stripePK } = await getStripePK() // Can probably change stripePK to next_public
            const promise = await loadStripe(stripePK!, { stripeAccount: 'acct_1Pq0p5PPUP2vo0Tr' });
            setStripePromise(promise);
        };
        loadStripePromise();
    }, []);

    useEffect(() => {
        checkoutAction({
            productId: state.checkoutProduct!, //This is fine because in the parent component we check if state.checkoutProduct is not null
            funnelId: state.funnelId
        })
            .then(async ({
                clientSecret,
                productName,
                productPrice
            }) => {
                if (clientSecret) setClientSecret(clientSecret)
                if (productName) setProductName(productName)
                if (productPrice) setProductPrice(productPrice)

                console.log('clientSecret', clientSecret)
            })
            .catch((error) => console.error(error))
    }, [])

    if (!clientSecret || !stripePromise || !productName || !productPrice) return null

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
                            productName={productName}
                            price={productPrice}
                            fields={defaultCheckoutFormFields}
                        />
                    </Elements>
                )}
            </div>
        </NodeViewWrapper>
    )
}