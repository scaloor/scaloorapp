import ErrorPage from '@/app/_components/common/error-page'
import { getFunnelByIdAction } from '@/server/actions/funnel'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { Button } from '@/app/_components/ui/button'
import Link from 'next/link'
import { Input } from '@/app/_components/ui/input'
import FunnelNameCard from './_components/funnel-name-card'

type FunnelViewPageProps = {
  params: {
    funnelId: string
  }
}

export default async function FunnelSettingsPage({ params }: FunnelViewPageProps) {
  const { funnelId } = params
  const { dbFunnel, error } = await getFunnelByIdAction(funnelId)
  if (error) return <ErrorPage errorMessage={error} />
  if (!dbFunnel) return <ErrorPage errorMessage="Funnel not found" />
  return (
    <div className='flex flex-col gap-4'>
      <FunnelNameCard funnelId={funnelId} name={dbFunnel.name} />
    </div>
  )
}
