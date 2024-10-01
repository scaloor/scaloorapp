

import ErrorPage from '@/app/_components/common/error-page'
import { getFunnelPreview } from '@/server/actions/funnel/preview'
import React from 'react'
import PagePreview from './page-preview'
import { PageProvider } from '@/app/[domain]/[funnel]/[page]/_components/page-provider'
import MaxWidthWrapper from '@/app/_components/common/max-width-wrapper'

type PreviewPageProps = {
    params: {
        funnelId: string
        pageName: string
    }
}

export default async function PreviewPage({ params }: PreviewPageProps) {
    const { funnelId, pageName } = params
    const { dbPage, checkoutProduct, error } = await getFunnelPreview(funnelId, pageName)
    if (error || !dbPage?.content || !checkoutProduct) {
        return (
            <ErrorPage errorMessage={error} />
        )
    }
    return (
        <MaxWidthWrapper>
            <PageProvider
                initialFunnelId={funnelId}
                initialCheckoutProduct={checkoutProduct}
                initialPaymentIntent={null}
                previewMode={true}
            >
                <PagePreview pageContent={dbPage.content} />
            </PageProvider>
        </MaxWidthWrapper>
    )
}