import { BlurPage } from "@/app/(main)/_components/blur-page"
import Editor from "./_components/editor"
import EditorNavigation from "./_components/navigation/top-nav"
import Toolbar from "./_components/navigation/styles-sidebar"
import EditorProvider from "./_components/providers/editor-provider"
import { Stage } from "@/server/db/types"
import { useReducer } from "react"



type FunnelEditorProps = {
    businessId: number
    funnelId: number
    stageId: number
}

export default function FunnelEditor({ businessId, funnelId, stageId }: FunnelEditorProps) {
    const stage: Stage = {} // Get Stage by ID

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