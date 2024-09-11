import StripeConnectButton from '@/app/_components/common/stripe/stripe-connect-button'
import { Badge } from '@/app/_components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { SelectBusiness } from '@/server/db/schema'
import React from 'react'

type StripeConnectCardProps = {
    business: SelectBusiness
}

export default function StripeConnectCard({ business }: StripeConnectCardProps) {
    return (
        <Card className='relative'>
            <CardHeader>
                <CardTitle>Stripe Connect Status</CardTitle>
                <CardDescription>
                    Connect your Stripe account
                </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col justify-between'>
                <div className='flex gap-2 items-center'>
                    <p>Status:</p>
                    <div className='text-sm text-muted-foreground'>
                        {business.stripeAccountId ?
                            <Badge variant={'affirmative'}>Connected</Badge>
                            :
                            <Badge variant={'destructive'}>Not connected</Badge>
                        }
                    </div>
                </div>

                <div className='absolute bottom-4 right-4'>
                    <StripeConnectButton
                        country_name={business.country}
                        email={business.businessEmail}
                        businessId={business.id}
                        returnUrl={'dashboard'}
                        connected={!!business.stripeAccountId}
                    />
                </div>
            </CardContent>
        </Card>
    )
}