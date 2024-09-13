import { Editor, Range } from "@tiptap/react";
import { CommandExtension, renderItems } from ".";


export type EditorCommandItem = {
    title: string;
    description?: string;
    element?: React.ReactNode;
    command: ({ editor, range }: { editor: Editor; range: Range }) => void;
}


const EditorCommandItems = (query: string) => {
    return [
        {
            title: 'Heading 1',
            description: 'Big section heading',
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .setNode('heading', { level: 1 })
                    .run()
            },
        },
        {
            title: 'Heading 2',
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .setNode('heading', { level: 2 })
                    .run()
            },
        },
        {
            title: 'Heading 3',
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .setNode('heading', { level: 3 })
                    .run()
            },
        },
        {
            title: 'Bullet List',
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor.chain().focus().deleteRange(range).toggleBulletList().run();
            },
        },
    ]
        .filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
        .slice(0, 10);
}

export const Command = CommandExtension.configure({
    suggestion: {
        items: ({ query }: { query: string }) =>  EditorCommandItems(query),
        render: renderItems,
    }
})
