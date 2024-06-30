
import React from 'react'
import CreateBusinessForm from './create-business-form'
import { getAuthUserDetails } from '@/server/actions/users';
import { redirect } from 'next/navigation';
import { getBusinessById } from '@/server/data/business';


export default async function AccountSetup() {
  const user = await getAuthUserDetails();
  if (!user) {
    return redirect('/auth/login')
  }
  if (user.businessId) {
    return redirect('/account')
  }
  return (
    <div>
        <CreateBusinessForm user={user} />
    </div>
  )
}