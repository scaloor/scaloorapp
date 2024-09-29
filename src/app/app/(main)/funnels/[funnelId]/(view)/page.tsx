import ErrorPage from '@/app/_components/common/error-page'
import { getFunnelByIdAction } from '@/server/actions/funnel'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { Button } from '@/app/_components/ui/button'
import Link from 'next/link'

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
    <Card>
      <CardContent>
        <h3 className='text-lg font-medium'>Edit Funnel</h3>
        <Link href={`/funnels/${funnelId}/edit`}>
          <Button>Edit Funnel</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
