'use client'
import React from 'react'
import { useCurrentEditor, FloatingMenu } from '@tiptap/react'
import { useFunnelEditor } from '../editor-provider'
import { defaultThankYouPage } from '../editor-provider/defaults'

export default function TiptapFloatingMenu() {
    const { editor } = useCurrentEditor()
    const { state, dispatch } = useFunnelEditor()
    const handleAddNewPage = () => {
        dispatch({ type: 'ADD_PAGE', page: defaultThankYouPage(state.funnelId, state.pages.length + 1) })
    }
    return (
        <>
            {editor && <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
                <div className="floating-menu">
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                    >
                        H1
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    >
                        H2
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}
                    >
                        Bullet list
                    </button>
                    <button
                        onClick={handleAddNewPage}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Add New Page
                    </button>
                </div>
            </FloatingMenu>}
        </>
    )
}