import { BlurPage } from "@/app/(main)/_components/blur-page"
import Editor from "./_components/editor"
import EditorNavigation from "./_components/editor-navigation"



type Props = {
    // Funnel ID goes here
}

export default function FunnelEditor({ }: Props) {
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-white overflow-hidden">
            <EditorNavigation />
            <div className="container max-w-4xl">
                <h1 className="text-6xl text-black text-center">Funnel Editor</h1>
                <Editor />
            </div>
        </div>
    )
}