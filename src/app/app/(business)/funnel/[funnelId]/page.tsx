import React from 'react'
import StageList, { StageListDetails } from './_components/stage-list';
import { getStagesByFunnelId } from '@/server/data/stage';
import ErrorPage from '@/app/_components/common/error-page';
import CreateStageDialog from './_components/create-stage-dialog';
import { getFunnelById } from '@/server/data/funnels';
import { Badge } from '@/app/_components/ui/badge';

type FunnelPageProps = {
    params: {
        funnelId: string;
    }
}

export default async function FunnelPage({ params }: FunnelPageProps) {
    const { funnelId } = params;
    const { dbFunnel } = await getFunnelById(funnelId);
    const { stages } = await getStagesByFunnelId(funnelId);
    if (!stages || !dbFunnel) {
        return <ErrorPage errorMessage='Unable to find stages' />
    }
    const stagesDetails: StageListDetails[] = stages
        .sort((a, b) => a.order - b.order)
        .map((stage) => ({
            id: stage.id,
            name: stage.name,
            order: stage.order,
            pathName: stage.pathName,
            createdAt: stage.createdAt,
            updatedAt: stage.updatedAt,
            previewImage: stage.previewImage || undefined
        }));

    return (
        <>
            <div className='flex flex-row justify-between'>
                <div className='gap-2'>
                    <h4 className='text-4xl mb-2 font-semibold'>Funnel Name: <span className='text-muted-foreground font-normal'>{dbFunnel.name}</span></h4>
                    {dbFunnel.published ?
                        <Badge variant='default' className='text-center'>Published</Badge> :
                        <Badge variant='destructive' className='align-center'>Not Published</Badge>}
                </div>
                <CreateStageDialog funnelId={funnelId} next_stage={stages.length + 1} />
            </div>
            {/* Stage List */}
            <div className='w-full'>
                <StageList stages={stagesDetails} />
            </div>
        </>
    )
}