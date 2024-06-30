
import React from 'react'
import CreateBusinessForm from './create-business-form'
import { getAuthUserDetails } from '@/server/actions/users';
import { redirect } from 'next/navigation';


export default async function AccountSetup() {
  const user = await getAuthUserDetails();
  if (!user?.email) {
    return redirect('/auth/login')
  }
  return (
    <div>
        <CreateBusinessForm user_email={user?.email} />
    </div>
  )
}