import ErrorPage from '@/app/_components/common/error-page'
import { getFunnelByIdAction } from '@/server/actions/funnel'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { Button } from '@/app/_components/ui/button'
import Link from 'next/link'
import { Input } from '@/app/_components/ui/input'

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
      <Card>
        <CardHeader>
          <h3 className='text-lg font-medium'>Funnel Name</h3>
          <p className='text-sm text-muted-foreground'>Change the name of your funnel to update the URL path.</p>
        </CardHeader>
        <CardContent>
          <div className="max-w-md">
            <Input value={dbFunnel.name} />
          </div>
          <div className='flex justify-end'>
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h3 className='text-lg font-medium'>Edit Funnel</h3>
        </CardHeader>
        <CardContent>
          <Link href={`/funnels/${funnelId}/edit`}>
            <Button>Edit Funnel</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
