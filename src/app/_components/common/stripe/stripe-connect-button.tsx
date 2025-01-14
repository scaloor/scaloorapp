'use client';
import { Button } from '@/app/_components/ui/button';
import { cn } from '@/lib/utils';
import createStripeAccount from '@/server/actions/stripe/account';
import { StripeConnectReturnUrl } from '@/server/actions/stripe/account-link';
import { useRouter } from 'next/navigation';
import React from 'react'

type StripeConnectButtonProps = {
    country_name: string;
    email: string;
    organizationId: string;
    returnUrl: StripeConnectReturnUrl;
    connected: boolean;
    className?: string;
}

export default function StripeConnectButton({
    country_name,
    email,
    organizationId,
    returnUrl,
    connected,
    className
}: StripeConnectButtonProps) {
    const router = useRouter()
    
    const connectStripe = async () => {
        const { url, error } = await createStripeAccount({ country_name, email, organizationId, returnUrl });
        // Client side error handling here
        router.push(url!);
    }
    return (
        <Button
            className={cn('h-8', className)}
            onClick={connectStripe}
        >
            {connected ? 'Edit Stripe Account' : 'Connect Stripe'}
        </ Button>
    )
}