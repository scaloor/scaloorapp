
import MaxWidthWrapper from '@/app/_components/common/max-width-wrapper'
import React from 'react'
import NavigationButtons from '../_components/navigation-buttons'
import { getFunnelByIdAction } from '@/server/actions/protected/funnel'
import ErrorPage from '@/app/_components/common/error-page'
import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/app/_components/ui/button'

type FunnelViewLayoutProps = {
    children: React.ReactNode
    params: Promise<{
        funnelId: string
    }>
}

export default async function FunnelViewLayout({ children, params }: FunnelViewLayoutProps) {
    const { funnelId } = await params
    const { dbFunnel, dbDomain, error } = await getFunnelByIdAction(funnelId)
    if (error) return <ErrorPage errorMessage={error} />
    if (!dbFunnel) return <ErrorPage errorMessage="Funnel not found" />
    return (
        <MaxWidthWrapper>
            <div className='py-4'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className="text-2xl font-bold mb-2">{dbFunnel.name}</h1>
                        {dbDomain && (
                            <div className="flex items-center gap-2 bg-slate-200 p-1 w-fit rounded-md my-2">
                                <a
                                    href={`https://${dbDomain.domain}/${dbFunnel.pathName}`}
                                    target="_blank"
                                    className="text-sm text-muted-foreground hover:underline hover:text-foreground"
                                >
                                    {dbDomain.domain}/{dbFunnel.pathName}
                                </a>
                                <ExternalLinkIcon className="w-4 h-4" />
                            </div>
                        )}
                    </div>
                    <Link href={`/funnels/${funnelId}/edit`}>
                        <Button>Edit Funnel</Button>
                    </Link>
                </div>
                <div className="flex gap-4">
                    <NavigationButtons funnelId={funnelId} />
                </div>
            </div>
            <div className="w-full h-px bg-gray-200 mb-4"></div>
            {children}
        </MaxWidthWrapper>
    )
}