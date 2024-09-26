
import MaxWidthWrapper from '@/app/_components/common/max-width-wrapper'
import React from 'react'
import NavigationButtons from '../_components/navigation-buttons'
import { getFunnelByIdAction } from '@/server/actions/funnel'
import ErrorPage from '@/app/_components/common/error-page'

type FunnelViewLayoutProps = {
    children: React.ReactNode
    params: {
        funnelId: string
    }
}

export default async function FunnelViewLayout({ children, params }: FunnelViewLayoutProps) {
    const { funnelId } = params
    const { dbFunnel, error } = await getFunnelByIdAction(funnelId)
    if (error) return <ErrorPage errorMessage={error} />
    if (!dbFunnel) return <ErrorPage errorMessage="Funnel not found" />
    return (
        <MaxWidthWrapper>
            <div className='py-4'>
                <h1 className="text-2xl font-bold mb-2">{dbFunnel.name}</h1>
                <div className="flex gap-4">
                    <NavigationButtons funnelId={funnelId} />
                </div>
            </div>
            <div className="w-full h-px bg-gray-200 mb-4"></div>
            {children}
        </MaxWidthWrapper>
    )
}