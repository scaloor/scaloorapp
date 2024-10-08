import ErrorPage from '@/app/_components/common/error-page';
import React from 'react'
import EditBusinessForm from './edit-business-form';
import { editBusinessSettingsAction } from '@/server/actions/protected/settings';


export default async function EditBusinessPage() {
    const { user, business, error } = await editBusinessSettingsAction()
    if (error) return <ErrorPage errorMessage={error} />
    if (!user || !business) return <ErrorPage errorMessage="User not found" />
    return (
        <EditBusinessForm business={business} />
    )
}