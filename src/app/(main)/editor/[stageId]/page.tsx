import { getStageById } from "@/server/data/stage"
import StageEditor from "./_components/stage-editor"
import StageEditorProvider from "./_components/providers/editor-provider"


type FunnelEditorProps = {
    params: {
        businessId: number
        funnelId: number
        stageId: number
    }
}

export default async function FunnelEditor({ params }: FunnelEditorProps) {
    const { businessId, funnelId, stageId } = params;
    const stage = await getStageById(stageId);

    if (!stage) {
        return <div>Stage not found</div>
    }

    return (
        <StageEditorProvider
            businessId={businessId}
            funnelId={funnelId}
            pageDetails={stage}>
            <StageEditor stage={stage} />
        </StageEditorProvider>
    )
}