'use client'
/**
 * I need to create a nested editor component that will have only the necessary extensions
 * I.E a card node should not be able to render new card nodes, but it should include
 * images and video nodes.
 * This will also be useful to create colummns, with two editors side by side. This should
 * have the same restrictions as a card node.
 */
import React from 'react'
import { Card, CardContent } from '@/app/_components/ui/card'
import {
    EditorBubble,
    EditorCommand,
    EditorCommandEmpty,
    EditorCommandItem,
    EditorCommandList,
    EditorContent,
    EditorInstance,
    EditorRoot,
    JSONContent,
    useEditor,
} from "novel"
import { extensions } from '../../extensions'
import { suggestionItems } from '../../extensions/slash-command'
import {
    ColorSelector,
    LinkSelector,
    NodeSelector,
    TextButtons,
} from "../../bubble/selectors"
import { Separator } from '@/app/_components/ui/separator'
import { useState, useCallback } from 'react'
import { NodeViewContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { nestedContent } from './nested-content'

interface NestedEditorProps {
    initialContent: JSONContent
    onChange: (content: JSONContent) => void
}

const NestedEditor: React.FC<NestedEditorProps> = ({ initialContent, onChange }) => {
    const [openNode, setOpenNode] = useState(false)
    const [openColor, setOpenColor] = useState(false)
    const [openLink, setOpenLink] = useState(false)

    const handleUpdate = useCallback(({ editor }: { editor: EditorInstance }) => {
        const json = editor.getJSON()
        onChange(json)
    }, [onChange])

    // The card should be rendered outside of the editor, i.e. not in this component
    return (
        <EditorRoot>
            <EditorContent
                extensions={[StarterKit]}
                initialContent={initialContent}
                className=''
                editorProps={{
                    attributes: {
                        class: 'prose prose-sm dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full'
                    }
                }}
                onUpdate={handleUpdate}
            >
                <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
                    <EditorCommandEmpty className="px-2 text-muted-foreground">No results</EditorCommandEmpty>
                    <EditorCommandList>
                        {suggestionItems.map((item) => (
                            <EditorCommandItem
                                value={item.title}
                                onCommand={(val) => item.command?.(val)}
                                className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                                key={item.title}
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-xs text-muted-foreground">{item.description}</p>
                                </div>
                            </EditorCommandItem>
                        ))}
                    </EditorCommandList>
                </EditorCommand>

                <EditorBubble
                    tippyOptions={{
                        placement: "top",
                    }}
                    className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
                >
                    <Separator orientation="vertical" />
                    <NodeSelector open={openNode} onOpenChange={setOpenNode} />
                    <Separator orientation="vertical" />
                    <LinkSelector open={openLink} onOpenChange={setOpenLink} />
                    <Separator orientation="vertical" />
                    <TextButtons />
                    <Separator orientation="vertical" />
                    <ColorSelector open={openColor} onOpenChange={setOpenColor} />
                </EditorBubble>
            </EditorContent>
        </EditorRoot>
    )
}

export default NestedEditor

