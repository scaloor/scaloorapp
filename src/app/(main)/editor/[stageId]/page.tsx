import { getStageById } from "@/server/data/stage"
import Editor from "./_components/editor"
import EditorNavigation from "./_components/navigation/top-nav"
import EditorProvider from "./_components/providers/editor-provider"


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
        <EditorProvider
            businessId={businessId}
            funnelId={funnelId}
            pageDetails={stage}>
            <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-white overflow-hidden">
                <EditorNavigation />
                <div className="container max-w-4xl">
                    <Editor />
                </div>
            </div>
        </EditorProvider>
    )
}