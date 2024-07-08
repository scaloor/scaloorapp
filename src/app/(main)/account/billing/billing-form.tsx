'use client'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { formatDate } from '@/lib/utils'
import { stripeSession } from '@/server/actions/stripe'
import { Subscription } from '@/server/db/types'
import { useRouter } from 'next/navigation'
import React from 'react'

type BillingFormProps = {
    subscription: Subscription
}

export default function BillingForm({ subscription }: BillingFormProps) {
    const router = useRouter()

    const manageSubscription = async () => {
        const url = await stripeSession(subscription.plan);
        router.push(url!)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Billing</CardTitle>
                <CardDescription>
                    Manage your billing information.
                </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4'>
                    <p>You are currently on the &apos;{subscription.plan}&apos; plan.</p>
                    <p>Your current subscription will expire on {formatDate(new Date(subscription.currentPeriodEndDate))}.</p>
                    <Button className='dark:text-white max-w-[200px]' onClick={manageSubscription}>
                        Manage subscription
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}