import ErrorPage from '@/app/_components/common/error-page'
import { getFunnelByIdAction } from '@/server/actions/protected/funnel'
import React from 'react'
import FunnelNameCard from './_components/funnel-name-card'

type FunnelViewPageProps = {
  params: Promise<{
    funnelId: string
  }>
}

export default async function FunnelSettingsPage({ params }: FunnelViewPageProps) {
  const { funnelId } = await params
  const { dbFunnel, error } = await getFunnelByIdAction(funnelId)
  if (error) return <ErrorPage errorMessage={error} />
  if (!dbFunnel) return <ErrorPage errorMessage="Funnel not found" />
  return (
    <div className='flex flex-col gap-4'>
      <FunnelNameCard funnelId={funnelId} name={dbFunnel.name} />
    </div>
  )
}
