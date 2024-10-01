'use client'

import { dynamicPageContentExtensions } from '@/app/[domain]/[funnel]/[page]/_components/extensions'
import { EditorProvider, JSONContent } from '@tiptap/react'
import React from 'react'

type PagePreviewProps = {
    pageContent: JSONContent
}

export default function PagePreview({ pageContent }: PagePreviewProps) {
    return (
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
    )
}