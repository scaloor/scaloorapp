'use client'
import { useState } from 'react'
import { stripeSession } from '@/server/actions/stripe'
import { Button } from '@/app/_components/ui/button'
import { CircleX } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { FormError } from '@/app/_components/common/form-error'



export default function CancelPage() {
    const [formError, setFormError] = useState<string>("");
    const router = useRouter();

    const handleRetry = async () => {
        const url = await stripeSession('funnels');
        if (!url) {
            setFormError("Unable to create subscription");
            return;
        };
        router.push(url);
    }

    return (
        <div className='flex justify-center py-5'>
            <div className='flex flex-col justify-center items-center gap-4'>
                <CircleX className='h-12 w-12 text-red-500 justify-center' />
                <h1 className='text-4xl font-bold text-center'>
                    Your payment was cancelled.
                </h1>
                <div className='flex justify-center gap-2'>
                    <Button className='dark:text-white' onClick={handleRetry}>
                        Retry payment
                    </Button>
                </div>
                <FormError message={formError} />
            </div>
        </div>
    )
}