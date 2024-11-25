import React, { use } from 'react'
import CheckoutTabs from './_components/tabs'
import CheckoutPreview from './_components/preview'
import { getCheckoutDetailsAction } from '@/server/actions/protected/checkout'
import { CheckoutProvider } from './_components/checkout-provider'

type CheckoutPageProps = {
    params: Promise<{
        checkoutId: string
    }>
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
    const { checkoutId } = await params
    const { dbCheckout, dbBusiness } = await getCheckoutDetailsAction(checkoutId)
    if (!dbCheckout || !dbBusiness?.stripeAccountId) {
        return <div>Checkout not found</div>
    }

    return (
        <div className='flex justify-between mt-4 gap-4'>
            <CheckoutProvider initialCheckout={dbCheckout}>
                <CheckoutTabs dbCheckout={dbCheckout} />
                <CheckoutPreview stripeAccountId={dbBusiness?.stripeAccountId} dbCheckout={dbCheckout} />
            </CheckoutProvider>
        </div>
    )
}