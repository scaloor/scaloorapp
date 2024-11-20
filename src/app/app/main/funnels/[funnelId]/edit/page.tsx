import { loadEditorAction } from '@/server/actions/protected/editor'
import React from 'react'
import PageEditor from './_components/page-editor'
import MaxWidthWrapper from '@/app/_components/common/max-width-wrapper'
import ErrorPage from '@/app/_components/common/error-page'
import { FunnelEditorProvider } from './_components/editor-provider'
import { defaultLandingPage } from './_components/editor-provider/defaults'
import EditorNavigation from './_components/editor-navigation'

type FunnelEditPageProps = {
  params: Promise<{
    funnelId: string
  }>
}

export default async function FunnelEditPage({ params }: FunnelEditPageProps) {
  const { funnelId } = await params
  const { pages, businessId, checkoutProduct, published, error } = await loadEditorAction({ funnelId })
  if (error || !pages) {
    return <ErrorPage errorMessage={error || 'Error loading funnel'} />
  }
  const initialPages = pages.length > 0 ? pages : [defaultLandingPage(funnelId)]
  return (
    <MaxWidthWrapper>
      <FunnelEditorProvider
        initialPages={initialPages}
        funnelId={funnelId}
        businessId={businessId}
        checkoutProduct={checkoutProduct || ''}
        published={published}
      >
        <EditorNavigation />
        <PageEditor />
      </FunnelEditorProvider>
    </MaxWidthWrapper>
  )
}