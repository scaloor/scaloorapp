'use client'

import { extensions } from './extensions'
import { defaultContent } from './default-content'
import {
    EditorBubble,
    EditorCommand,
    EditorCommandEmpty,
    EditorCommandItem,
    EditorCommandList,
    EditorContent,
    type EditorInstance,
    EditorRoot,
    type JSONContent,
} from "novel";
import { suggestionItems } from './extensions/slash-command';
import { useState } from 'react';
// import all selectors from the index file
import {
    ColorSelector,
    LinkSelector,
    NodeSelector,
    TextButtons,
} from "./bubble/selectors";
import { Separator } from '@/app/_components/ui/separator';


export default function Novel() {
    const [openNode, setOpenNode] = useState(false);
    const [openColor, setOpenColor] = useState(false);
    const [openLink, setOpenLink] = useState(false);
    return (
        <EditorRoot>
            <EditorContent
                extensions={extensions}
                initialContent={defaultContent}
                immediatelyRender={false}
                className=''
                editorProps={{
                    attributes: {
                        class: 'prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full'
                    }
                }}

            >
                {/* Editor Command Box, used to new line and slash command */}
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