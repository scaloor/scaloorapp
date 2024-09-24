import { getDynamicPageAction } from '@/server/actions/public/dynamic'
import React from 'react'
import DynamicPageContent from './_components/dynamic-page-content'

type DynamicPageProps = {
  params: {
    domain: string
    funnel: string
    page: string
  }
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  //const subdomain = params.domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '');

  // Get the funnel page using the params
  const { dbPage, error } = await getDynamicPageAction({ domainName: params.domain, funnelPath: params.funnel, pagePath: params.page })

  if (error || !dbPage?.content) {
    return <div>404</div>
  }



  return (
    <div>{JSON.stringify(dbPage)}
      <div>
        <DynamicPageContent pageContent={dbPage.content} />
      </div>
    </div>
  )
}