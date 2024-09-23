'use client'

import { ReactNode } from "react";
import { Editor, Range } from "@tiptap/react";
import { Command, renderItems } from ".";
import { Heading1Icon, Heading2Icon, Heading3Icon, ListIcon, ListOrderedIcon, type LucideIcon, ShoppingCartIcon, TextIcon } from "lucide-react";
import YoutubeIcon from '@/lib/icons/youtube'
import Youtube from '@tiptap/extension-youtube'

export type EditorCommandItem = {
    title: string;
    description: string;
    icon: LucideIcon
    command: ({ editor, range }: { editor: Editor; range: Range }) => void;
}


const EditorCommandItems = (query: string) => {
    return [
        {
            title: 'Text',
            description: 'Start typing with plain text.',
            icon: TextIcon,
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor.chain().focus().deleteRange(range).setNode('paragraph').run()
            },
        },
        {
            title: 'Heading 1',
            description: 'Big heading.',
            icon: Heading1Icon,
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                console.log(range)
                editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
            },
        },
        {
            title: 'Heading 2',
            description: 'Medium heading.',
            icon: Heading2Icon,
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
            },
        },
        {
            title: 'Heading 3',
            description: 'Small heading.',
            icon: Heading3Icon,
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
            },
        },
        {
            title: 'Bullet List',
            description: 'A dot point list.',
            icon: ListIcon,
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor.chain().focus().deleteRange(range).toggleBulletList().run();
            },
        },
        {
            title: 'Ordered List',
            description: 'A numbered list.',
            icon: ListOrderedIcon,
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor.chain().focus().deleteRange(range).toggleOrderedList().run();
            },
        },
        {
            title: 'Youtube Video',
            description: 'Add a Youtube video.',
            icon: YoutubeIcon,
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                const videoLink = prompt("Please enter Youtube Video Link");
                //From https://regexr.com/3dj5t
                const ytregex = new RegExp(
                    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/,
                );

                if (videoLink && ytregex.test(videoLink)) {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .setYoutubeVideo({
                            src: videoLink,
                        })
                        .run();
                } else {
                    if (videoLink !== null) {
                        alert("Please enter a correct Youtube Video Link");
                    }
                }
            },
        },
    ]
}

export const command = Command.configure({
    suggestion: {
        items: ({ query }: { query: string }) => EditorCommandItems(query),
        render: renderItems,
    }
})
