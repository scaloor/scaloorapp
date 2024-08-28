import ErrorPage from '@/app/_components/common/error-page';
import { getAuthUserDetails } from '@/server/actions/users';
import { getBusinessById } from '@/server/data/business';
import React from 'react'
import EditBusinessForm from './edit-business-form';


export default async function EditBusinessPage() {
    const { dbUser } = await getAuthUserDetails();
    if (!dbUser) return <ErrorPage errorMessage="User not found" />
    const { dbBusiness } = await getBusinessById(dbUser.businessId!)
    if (!dbBusiness) return <ErrorPage errorMessage="Business not found" />
    return (
        <EditBusinessForm business={dbBusiness} />
    )
}