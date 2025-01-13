import React from 'react'
import CreateDeliveryForm from './create-delivery-form'
import { getAuthUserDetails } from '@/server/actions/protected/users'


export default async function DeliveryPage() {
    const { dbUser } = await getAuthUserDetails()
    if (!dbUser?.businessId) return <div>Loading...</div>
    return (
        <div className="flex justify-center items-center md:mt-10">
            <CreateDeliveryForm businessId={dbUser.businessId} />
        </div>
    )
}