'use client'
import { formatPriceToString } from '@/lib/utils';
import { SelectCheckout } from '@/server/db/schema'
import Image from 'next/image'
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { SCALOOR_BUCKET } from '@/lib/constants';
import { useCheckout } from '@/app/app/(mvp)/products/[checkoutId]/_components/checkout-provider';


type CheckoutFormProps = {
    dbCheckout: SelectCheckout;
}

export default function CheckoutForm({ dbCheckout }: CheckoutFormProps) {
    const stripe = useStripe()
    const elements = useElements()
    const checkoutStore = useCheckout()

    console.log(checkoutStore)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <form
            id='payment-form'
            onSubmit={handleSubmit}
            className='flex flex-col gap-4 w-full max-w-md mx-auto'
        >
            <div>
                <h2>{dbCheckout.productName}</h2>
                <p>{formatPriceToString(dbCheckout.productPrice * 100)}</p>
                {dbCheckout.thumbnail && (
                    <Image 
                        src={`${SCALOOR_BUCKET}/${dbCheckout.thumbnail}`} 
                        alt={dbCheckout.productName} 
                        width={200} 
                        height={200} 
                        className="w-[80%] h-auto object-cover"
                    />
                )}
            </div>
            <div className="w-fit text-wrap">
                <p>{dbCheckout.productDescription}</p>
            </div>
            <div className='flex flex-col gap-2'>
                {checkoutStore.checkout.customerName && <Input type='text' placeholder='Name' />}
                {checkoutStore.checkout.customerEmail && <Input type='email' placeholder='Email' />}
                {checkoutStore.checkout.customerPhone && <Input type='tel' placeholder='Phone' />}
                {checkoutStore.checkout.customerAddress && <Input type='text' placeholder='Address' />}
            </div>
            <PaymentElement />
            <Button>Submit</Button>
        </form>
    )
}