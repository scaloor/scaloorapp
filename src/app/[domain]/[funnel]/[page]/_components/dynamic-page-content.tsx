'use client'

import MaxWidthWrapper from "@/app/_components/common/max-width-wrapper"
import { EditorProvider, JSONContent } from "@tiptap/react"
import { dynamicPageContentExtensions } from "./extensions"
import { defaultLandingPageContent } from "@/app/app/(main)/funnels/[funnelId]/edit/_components/tiptap/default-content"


type DynamicPageContentProps = {
    pageContent: JSONContent
}

export default function DynamicPageContent({ pageContent }: DynamicPageContentProps) {
    console.log(pageContent)
    return (
        <MaxWidthWrapper>
            <EditorProvider
                extensions={dynamicPageContentExtensions}
                content={pageContent}
                editable={false}
                immediatelyRender={false}
                editorProps={{
                    attributes: {
                        class: 'prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full',
                    },
                }}
            />
        </MaxWidthWrapper>
    )
}