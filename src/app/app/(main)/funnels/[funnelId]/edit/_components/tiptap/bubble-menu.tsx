'use client'
import { BubbleMenu, useCurrentEditor } from '@tiptap/react'
import React from 'react'


export default function TiptapBubbleMenu() {
    const { editor } = useCurrentEditor()
    //console.log(editor?.commands)
    return (
        <>
            {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                <div className="bubble-menu">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'is-active' : ''}
                    >
                        Bold
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'is-active' : ''}
                    >
                        Italic
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive('strike') ? 'is-active' : ''}
                    >
                        Strike
                    </button>
                </div>
            </BubbleMenu>}
        </>
    )
}

