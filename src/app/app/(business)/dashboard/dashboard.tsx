'use client'
import { Button } from '@/app/_components/ui/button'
import createStripeAccount from '@/server/actions/stripe/account'
import { createStripeAccountLink } from '@/server/actions/stripe/account-link'
import { useRouter } from 'next/navigation'
import React from 'react'

type DashboardProps = {
    email: string;
    country: string | null;
}

export default function Dashboard({ email, country }: DashboardProps) {
    const router = useRouter()

    const handleOnConnect = async () => {
        /* fetch("/api/stripe/account", {
            method: "POST",
        })
            .then((response) => response.json())
            .then((json) => {
                // setAccountCreatePending(false);

                const { account, error } = json;

                if (account) {
                    console.log('Account created:', account);
                }

                if (error) {
                    console.log('Error:', error);
                }
            }); */
        const { accountId, error } = await createStripeAccount({ country, email });
        // Client side error handling here

        if (accountId) {
            console.log('Account created:', accountId);
        }
    }

    const handleOnLink = async () => {
        const { url, error } = await createStripeAccountLink({ accountId: 'acct_1PpdToPDW54cIZKC' });
        router.push(url!);

    }

    return (
        <div className='flex flex-col gap-4'>
            <Button onClick={handleOnConnect}>
                Connect to Stripe
            </Button>
            <Button onClick={handleOnLink}>
                Link Account
            </Button>
        </div>
    )
}