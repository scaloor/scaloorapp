import { loadEditorAction } from '@/server/actions/api/editor'
import React from 'react'
import PageEditor from './_components/page-editor'
import MaxWidthWrapper from '@/app/_components/common/max-width-wrapper'
import ErrorPage from '@/app/_components/common/error-page'

type FunnelEditPageProps = {
  params: {
    funnelId: string
  }
}

export default async function FunnelEditPage({ params }: FunnelEditPageProps) {
  const { funnelId } = params
  const { pages, error } = await loadEditorAction({ funnelId })
  if (error || !pages) {
    return <ErrorPage errorMessage={error || 'Error loading funnel'} />
  }
  return (
    <MaxWidthWrapper>
      <PageEditor
        initialPages={pages}
        funnelId={funnelId}
      />
    </MaxWidthWrapper>
  )
}