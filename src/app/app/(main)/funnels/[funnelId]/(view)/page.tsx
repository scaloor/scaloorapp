import ErrorPage from '@/app/_components/common/error-page'
import MaxWidthWrapper from '@/app/_components/common/max-width-wrapper'
import { Button } from '@/app/_components/ui/button'
import { getFunnelByIdAction } from '@/server/actions/funnel'
import React from 'react'
import NavigationButtons from '../_components/navigation-buttons'

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
    <div>General</div>
  )
}
