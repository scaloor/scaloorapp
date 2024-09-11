'use client'
import { cn } from '@/lib/utils'
import { stripeSession } from '@/server/actions/stripe'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '@/app/_components/ui/button'

type ManageSubscriptionButtonProps = {
    plan_slug: string;
    className?: string;
}

export default function ManageSubscriptionButton({ plan_slug, className }: ManageSubscriptionButtonProps) {
    const router = useRouter()
    const manageSubscription = async () => {
        const url = await stripeSession(plan_slug);
        router.push(url!)
    }
    return (
        <Button className={cn('max-w-[200px] h-8', className)} onClick={manageSubscription}>
            Manage subscription
        </Button>
    )
}