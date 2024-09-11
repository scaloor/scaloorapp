'use client'
import React, { useCallback, useState } from 'react'
import { EditorRoot, EditorContent, EditorCommand, EditorBubble, EditorCommandEmpty, EditorCommandItem, EditorCommandList, JSONContent, EditorInstance } from 'novel'
import { extensions } from './extensions'
import { suggestionItems } from './extensions/slash-command'
import { Separator } from '@/app/_components/ui/separator';
import {
    ColorSelector,
    LinkSelector,
    NodeSelector,
    TextButtons,
} from "./selectors";


type NovelProps = {
    initialContent: JSONContent
    //onChange: (content: JSONContent) => void
}

export default function Novel({ initialContent }: NovelProps) {
    const [value, setValue] = useState<JSONContent>(initialContent);
    const [openNode, setOpenNode] = useState(false);
    const [openColor, setOpenColor] = useState(false);
    const [openLink, setOpenLink] = useState(false);

    const handleUpdate = useCallback(({ editor }: { editor: EditorInstance }) => {
        const json = editor.getJSON();
        setValue(json);
    }, []);

    return (
        <EditorRoot>
            <EditorContent
                extensions={extensions}
                initialContent={initialContent}
                immediatelyRender={false}
                editorProps={{
                    attributes: {
                        class: 'prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full'
                    }
                }}
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

                {/* Editor Bubble */}
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