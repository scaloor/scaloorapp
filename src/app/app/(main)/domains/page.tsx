import MaxWidthWrapper from '@/app/_components/common/max-width-wrapper'
import { Button } from '@/app/_components/ui/button'
import { getDomainsAction } from '@/server/actions/api/domain'
import React from 'react'
import { DomainCard } from './_components/domain-card'
import ErrorPage from '@/app/_components/common/error-page'
import AddScaloorDialog from './_components/add-scaloor-dialog'


export default async function DomainsPage() {
  const { dbDomains, error } = await getDomainsAction()

  if (error || !dbDomains) {
    return <ErrorPage errorMessage={error || 'Failed to load domains'} />
  }

  return (
    <MaxWidthWrapper>

      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Domains</h1>
          <p className="text-sm text-muted-foreground">
            Bring in your own domain or create up to 3 scaloor domains.
          </p>
        </div>
        <div className="flex gap-2">
          <AddScaloorDialog />
          <Button size="sm" className="h-8">
            Add custom domain
          </Button>

        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mb-4"></div>
      <div className="flex flex-col gap-4">
        {dbDomains.map((domain) => (
          <DomainCard
            key={domain.id}
            domainId={domain.id}
            domain={domain.domain}
            lastUpdated={domain.updatedAt}
          />
        ))}
      </div>
    </MaxWidthWrapper>
  )
}