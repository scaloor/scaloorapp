'use client'
import { ToggleGroup, ToggleGroupItem } from '@/app/_components/ui/toggle-group'
import { useState } from 'react'
import { BubbleMenu, useCurrentEditor } from '@tiptap/react'
import { AlignCenter, AlignLeft, AlignRight, Bold, BoldIcon, Italic, Strikethrough, Underline as UnderlineIcon } from 'lucide-react'
import NodeSelector from './node-selector'
import ColourSelector from './colour-selector'
import LinkButton from './link-button'


export default function TiptapBubbleMenu() {
    const { editor } = useCurrentEditor()
    const [openNode, setOpenNode] = useState(false);
    const [openColour, setOpenColour] = useState(false);
    const [openLink, setOpenLink] = useState(false);
    //console.log(editor?.commands)
    return (
        <>
            {editor && <BubbleMenu
                editor={editor}
                className='flex gap-2 w-fit'
                tippyOptions={{
                    duration: 100,
                    placement: 'top'
                }}
            >
                <div className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl">
                    <NodeSelector open={openNode} onOpenChange={setOpenNode} />
                    <ToggleGroup type='multiple'>
                        <ToggleGroupItem className='aria-selected:bg-zinc-200 dark:aria-selected:bg-zinc-800 rounded-none' value="bold" aria-label="Toggle bold" onClick={() => editor.chain().focus().toggleBold().run()}>
                            <Bold className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem className='aria-selected:bg-zinc-200 dark:aria-selected:bg-zinc-800 rounded-none' value="italic" aria-label="Toggle italic" onClick={() => editor.chain().focus().toggleItalic().run()}>
                            <Italic className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem className='aria-selected:bg-zinc-200 dark:aria-selected:bg-zinc-800 rounded-none' value="underline" aria-label="Toggle underline" onClick={() => editor.chain().focus().toggleUnderline().run()}>
                            <UnderlineIcon className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem className='aria-selected:bg-zinc-200 dark:aria-selected:bg-zinc-800 rounded-none' value="strikethrough" aria-label="Toggle strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()}>
                            <Strikethrough className="h-4 w-4" />
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <LinkButton open={openLink} onOpenChange={setOpenLink} />
                    <ColourSelector open={openColour} onOpenChange={setOpenColour} />
                </div>
                <div className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl">
                    <ToggleGroup type='multiple'>
                        <ToggleGroupItem className='aria-selected:bg-zinc-200 dark:aria-selected:bg-zinc-800 rounded-none' value="left" aria-label="Toggle left" onClick={() => editor.chain().focus().setTextAlign('left').run()}>
                            <AlignLeft className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem className='aria-selected:bg-zinc-200 dark:aria-selected:bg-zinc-800 rounded-none' value="center" aria-label="Toggle center" onClick={() => editor.chain().focus().setTextAlign('center').run()}>
                            <AlignCenter className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem className='aria-selected:bg-zinc-200 dark:aria-selected:bg-zinc-800 rounded-none' value="right" aria-label="Toggle right" onClick={() => editor.chain().focus().setTextAlign('right').run()}>
                            <AlignRight className="h-4 w-4" />
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </BubbleMenu>}
        </>
    )
}

