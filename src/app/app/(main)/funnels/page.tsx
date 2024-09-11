import React from 'react'
import FunnelList from './_components/funnel-list'
import CreateFunnelDialog from './_components/create-funnel-dialog'
import ErrorPage from '@/app/_components/common/error-page';
import { getAllFunnelsAction } from '@/server/actions/funnel';

export default async function FunnelsPage() {
  const { funnels, businessId, error } = await getAllFunnelsAction()
  if (error) return <ErrorPage errorMessage={error} />
  if (!funnels || !businessId) return <ErrorPage errorMessage="Funnels not found" />

  if (funnels.length === 0) return (
    <div className="flex flex-col justify-center items-center mt-10">
      <h1 className="text-2xl font-bold mb-2">Create a funnel to get started</h1>
      <p className="text-gray-500 mb-4">Funnels are a series of steps that guide your customers through a journey to become a customer.</p>
      <CreateFunnelDialog businessId={businessId} />
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-2">Your Funnels</h1>
        <CreateFunnelDialog businessId={businessId} />
      </div>
      <div className="w-full h-px bg-gray-200 mb-4"></div>
      <FunnelList funnels={funnels} />
    </div>
  )
}