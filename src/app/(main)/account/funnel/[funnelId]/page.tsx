import React from 'react'
import StageList from './stage-list';
import { getStagesByFunnelId } from '@/server/data/stage';
import ErrorPage from '@/app/_components/common/error-page';

type FunnelPageProps = {
    params: {
        funnelId: number
    }
}

export default async function FunnelPage({ params }: FunnelPageProps) {
    const { funnelId } = params;
    const stages = await getStagesByFunnelId(funnelId);
    if (!stages) {
        return <ErrorPage errorMessage='Unable to find stages' />
    }
    return (
        <div id='funnel-page'>
            <div>
                <div>FunnelPage</div>
                <div>{funnelId}</div>
            </div>
            <div className='p-6'>
                <StageList stages={stages} />
            </div>
        </div>
    )
}