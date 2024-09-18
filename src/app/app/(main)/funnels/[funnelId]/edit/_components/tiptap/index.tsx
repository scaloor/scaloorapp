'use client'
import React, { useCallback, useState } from 'react'
import { extensions } from './extensions'
import { Editor, EditorProvider, JSONContent } from '@tiptap/react'
import TiptapBubbleMenu from './bubble-menu'


type NovelProps = {
    initialContent: JSONContent
    //onChange: (content: JSONContent) => void
}

export default function Tiptap({ initialContent }: NovelProps) {
    const [value, setValue] = useState<JSONContent>(initialContent);
    /* const [openNode, setOpenNode] = useState(false);
    const [openColor, setOpenColor] = useState(false);
    const [openLink, setOpenLink] = useState(false); */

    const handleUpdate = useCallback(({ editor }: { editor: Editor }) => {
        const json = editor.getJSON();
        console.log('Editor JSON', json)
        setValue(json);
    }, []);


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