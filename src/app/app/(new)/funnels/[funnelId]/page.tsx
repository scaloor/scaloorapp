import ErrorPage from '@/app/_components/common/error-page'
import { getFunnelByIdAction } from '@/server/actions/funnel'
import { redirect } from 'next/navigation'
import React from 'react'

type FunnelViewPageProps = {
  params: {
    funnelId: string
  }
}

export default async function FunnelViewPage({ params }: FunnelViewPageProps) {
  const { funnelId } = params
  const { dbFunnel, error } = await getFunnelByIdAction(funnelId)
  if (error) return <ErrorPage errorMessage={error} />
  if (!dbFunnel) return <ErrorPage errorMessage="Funnel not found" />
  return (
    <div>
      FunnelViewPage
    </div>
  )
}
