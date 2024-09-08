import React from 'react'
import FunnelList from './funnel-list'
import CreateFunnelDialog from '../../(business)/funnel/_components/create-funnel-dialog'
import { getAuthUserDetails } from '@/server/actions/users';
import ErrorPage from '@/app/_components/common/error-page';

export default async function FunnelsPage() {
  const { dbUser } = await getAuthUserDetails();
  if (!dbUser?.businessId) return <ErrorPage errorMessage="User not found" />

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-2">Your Funnels</h1>
        <CreateFunnelDialog businessId={dbUser.businessId} />
      </div>
      <div className="w-full h-px bg-gray-200 mb-4"></div>
      <FunnelList />
    </div>
  )
}