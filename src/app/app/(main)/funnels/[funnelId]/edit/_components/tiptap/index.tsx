'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { extensions } from './extensions'
import { Editor, EditorProvider, JSONContent } from '@tiptap/react'
import TiptapBubbleMenu from './bubble-menu'
import { onPageChangeAction } from '@/server/actions/api/editor'
import { useFunnelEditor } from '../editor-provider'


type TiptapProps = {
    initialContent: JSONContent
    pageId: string
    //onChange: (content: JSONContent) => void
}

export default function Tiptap({ initialContent, pageId }: TiptapProps) {
    const [editorContent, setEditorContent] = useState<JSONContent>(initialContent);
    const { state, dispatch } = useFunnelEditor()

    const handleUpdate = useCallback(({ editor }: { editor: Editor }) => {
        const json = editor.getJSON();
        setEditorContent(json);
    }, []);

    useEffect(() => {
        dispatch({ type: 'ON_PAGE_CHANGE', pageId, content: editorContent })
        console.log('Updated state:', state)
    }, [editorContent, dispatch, pageId]);


    return (
        <EditorProvider
            extensions={extensions}
            content={initialContent}
            onUpdate={handleUpdate}
            immediatelyRender={false}
            editorProps={{
                attributes: {
                    class: 'prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full',
                },
            }}
        >
            <TiptapBubbleMenu />
            {/* <TiptapFloatingMenu /> */}

        </EditorProvider>

    )
}