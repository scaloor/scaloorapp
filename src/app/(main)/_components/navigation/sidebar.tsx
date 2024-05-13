import { getAuthUserDetails } from '@/server/actions/users'
import { getBusinessById } from '@/server/data/business';
import React from 'react'
import { BusinessSidebarOptions } from './business-sidebar-options';

type Props = {
    type: 'AGENCY' | 'BUSINESS'
}

export async function Sidebar({ type }: Props) {

    const user = await getAuthUserDetails();
    if (!user?.businessId) {
        console.log('User does not have a business!')
        throw Error
    }

    const business = await getBusinessById(user.businessId)

    if (!business) {
        return
    }

    // This should be updated to make sidebar dynamic once agencies are added.
    if (type === 'BUSINESS') {
        const sidebarOptions = []
    }



    return (
        <BusinessSidebarOptions
            business={business}
            defaultOpen={true}
        />
    )
}