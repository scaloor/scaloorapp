import { getDynamicPageAction } from '@/server/actions/public/dynamic'
import React from 'react'
import DynamicPageContent from './_components/dynamic-page-content'
import { PageProvider } from './_components/page-provider'

type DynamicPageProps = {
  params: Promise<{
    domain: string
    funnel: string
    page: string
  }>
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { domain, funnel, page } = await params;

  // Get the funnel page using the params
  const { dbPage, checkoutProduct, funnelId, error } = await getDynamicPageAction({ domainName: domain, funnelPath: funnel, pagePath: page })
  if (error || !dbPage?.content || !checkoutProduct) {
    return (
      <div>
        404
      </div>
    )
  }



  return (
    <div>
      <PageProvider
        initialFunnelId={funnelId}
        initialCheckoutProduct={checkoutProduct}
        initialPaymentIntent={null}
        previewMode={false}
      >
        <DynamicPageContent pageContent={dbPage.content} />
      </PageProvider>
    </div>
  )
}