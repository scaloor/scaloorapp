'use client'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { formatDate } from '@/lib/utils'
import { cancelStripeSubscription, stripeSession } from '@/server/actions/stripe'
import { SelectSubscription } from '@/server/db/schema'
import { useRouter } from 'next/navigation'
import React from 'react'
import { stripe } from '@/lib/stripe'


type BillingFormProps = {
    subscription: SelectSubscription
}

export default function BillingForm({ subscription }: BillingFormProps) {
    const router = useRouter()

    const manageSubscription = async () => {
        const url = await stripeSession(subscription.plan);
        router.push(url!)
    }

    const cancelSubscriptionButton = async () => {
        await cancelStripeSubscription(subscription.subscriptionId!)
        router.refresh()
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
                    <Button className='dark:text-white max-w-[200px]' onClick={cancelSubscriptionButton}>
                        Cancel subscription
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}