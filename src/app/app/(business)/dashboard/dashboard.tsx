'use client'
import React, { useState } from 'react'
import StripeConnectButton from '../../../_components/common/stripe/stripe-connect-button'

type DashboardProps = {
    email: string;
    country: string;
    businessId: string;
    stripeAccountId: string | null;
}

export default function Dashboard({ email, country, businessId, stripeAccountId }: DashboardProps) {

    return (
        <div className='flex flex-col gap-4'>

        </div>
    )
}