'use client'
import { formatPriceToString } from '@/lib/utils';
import { SelectCheckout } from '@/server/db/schema'
import Image from 'next/image'
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { SCALOOR_BUCKET } from '@/lib/constants';


type CheckoutFormProps = {
    dbCheckout: SelectCheckout;
}

export default function CheckoutForm({ dbCheckout }: CheckoutFormProps) {
    const stripe = useStripe()
    const elements = useElements()

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
                        width={400} 
                        height={400} 
                        className="w-full h-auto object-cover"
                    />
                )}
            </div>
            <div className='flex flex-col gap-2'>
                {dbCheckout.customerName && <Input type='text' placeholder='Name' />}
                {dbCheckout.customerEmail && <Input type='email' placeholder='Email' />}
                {dbCheckout.customerPhone && <Input type='tel' placeholder='Phone' />}
                {dbCheckout.customerAddress && <Input type='text' placeholder='Address' />}
            </div>
            <PaymentElement />
            <Button>Submit</Button>
        </form>
    )
}