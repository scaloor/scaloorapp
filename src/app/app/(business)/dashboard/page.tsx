import React from 'react'
import Dashboard from './dashboard'
import { getAuthUserDetails } from '@/server/actions/users'
import ErrorPage from '@/app/_components/common/error-page';
import { getBusinessById } from '@/server/data/business';



export default async function DashboardPage() {
  const { dbUser } = await getAuthUserDetails();
  if (!dbUser) return <ErrorPage errorMessage="User not found" />
  const { dbBusiness } = await getBusinessById(dbUser.businessId!)
  if (!dbBusiness) return <ErrorPage errorMessage="Business not found" />
  return (
    <div>
      <Dashboard email={dbUser.email} country={dbBusiness.country} />
    </div>
  )
}