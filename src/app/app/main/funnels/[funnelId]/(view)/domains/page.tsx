import React from 'react'
import { Card, CardContent } from '@/app/_components/ui/card'
import { getFunnelDomainsAction } from '@/server/actions/protected/funnel/domains'
import ErrorPage from '@/app/_components/common/error-page'
import DomainSelect from './domain-select'
import Link from 'next/link'

type Props = {
  params: Promise<{
    funnelId: string
  }>
}

export default async function FunnelSettingsPage({ params }: Props) {
  const { funnelId } = await params
  const { dbDomains, currentDomain, error } = await getFunnelDomainsAction(funnelId)
  if (error || !dbDomains) return <ErrorPage errorMessage={error} />
  return (
    <div className='flex flex-col gap-4'>
      <p className='text-sm text-muted-foreground'>To select a domain you must first setup your domain in the <Link className='underline' href='/domains'>domain settings.</Link></p>
      <Card>
        <CardContent>
          <DomainSelect
            domains={dbDomains}
            selectedDomain={currentDomain || ''}
            funnelId={funnelId}
          />
        </CardContent>
      </Card>
    </div>
  )
}