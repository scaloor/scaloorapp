
import React from 'react'
import { Card, CardContent } from '@/app/_components/ui/card'
import { getFunnelDomainsAction } from '@/server/actions/protected/funnel/domains'
import ErrorPage from '@/app/_components/common/error-page'
import DomainSelect from './domain-select'

type Props = {
  params: {
    funnelId: string
  }
}

export default async function FunnelSettingsPage({ params }: Props) {
  const { funnelId } = params
  const { dbDomains, currentDomain, error } = await getFunnelDomainsAction(funnelId)
  if (error || !dbDomains) return <ErrorPage errorMessage={error} />
  return (
    <div className='flex flex-col gap-4'>
      <p className='text-sm text-muted-foreground'>To select a domain you must first setup your domain in the <a className='underline' href='/domains'>domain settings.</a></p>
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