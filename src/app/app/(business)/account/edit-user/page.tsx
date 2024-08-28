import ErrorPage from '@/app/_components/common/error-page';
import { getAuthUserDetails } from '@/server/actions/users';
import React from 'react'
import EditUserForm from './edit-user-form';



export default async function EditUserPage() {
    const { dbUser } = await getAuthUserDetails();
    if (!dbUser) return <ErrorPage errorMessage="User not found" />
  return (
    <EditUserForm user={dbUser} />
  )
}