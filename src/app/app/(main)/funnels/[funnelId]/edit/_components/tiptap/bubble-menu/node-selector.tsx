'use client'

import { Button } from '@/app/_components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/_components/ui/popover';
import { Editor, useCurrentEditor } from '@tiptap/react';
import { TextIcon, Heading1Icon, Heading2Icon, Heading3Icon, CheckSquareIcon, ListOrderedIcon, TextQuoteIcon, CodeIcon, ChevronDown, type LucideIcon, Check } from 'lucide-react';
import React, { ReactNode } from 'react'


export type SelectorItem = {
    title: string;
    icon: LucideIcon
    command: (editor: Editor) => void;
    isActive: (editor: Editor) => boolean;
}

const items: SelectorItem[] = [
    {
        title: "Text",
        icon: TextIcon,
        command: (editor: Editor) => editor.chain().focus().clearNodes().run(),
        // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
        isActive: (editor: Editor) =>
            editor.isActive("paragraph") &&
            !editor.isActive("bulletList") &&
            !editor.isActive("orderedList"),
    },
    {
        title: "Heading 1",
        icon: Heading1Icon,
        command: (editor) =>
            editor.chain().focus().clearNodes().toggleHeading({ level: 1 }).run(),
        isActive: (editor) => editor.isActive("heading", { level: 1 }),
    },
    {
        title: "Heading 2",
        icon: Heading2Icon,
        command: (editor) =>
            editor.chain().focus().clearNodes().toggleHeading({ level: 2 }).run(),
        isActive: (editor) => editor.isActive("heading", { level: 2 }),
    },
    {
        title: "Heading 3",
        icon: Heading3Icon,
        command: (editor) =>
            editor.chain().focus().clearNodes().toggleHeading({ level: 3 }).run(),
        isActive: (editor) => editor.isActive("heading", { level: 3 }),
    },
    {
        title: "Bullet List",
        icon: ListOrderedIcon,
        command: (editor) =>
            editor.chain().focus().clearNodes().toggleBulletList().run(),
        isActive: (editor) => editor.isActive("bulletList"),
    },
    {
        title: "Numbered List",
        icon: ListOrderedIcon,
        command: (editor) =>
            editor.chain().focus().clearNodes().toggleOrderedList().run(),
        isActive: (editor) => editor.isActive("orderedList"),
    },
];

type NodeSelectorProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function NodeSelector({ open, onOpenChange }: NodeSelectorProps) {
    const { editor } = useCurrentEditor();
    if (!editor) return null;

    const activeItem = items.filter((item) => item.isActive(editor)).pop() ?? {
        title: "Multiple",
    };
    return (
        <Popover modal={true} open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger
                asChild
                className="gap-2 rounded-none border-none hover:bg-accent focus:ring-0"
            >
                <Button size="sm" variant="ghost" className="gap-2">
                    <span className="whitespace-nowrap text-sm">{activeItem.title}</span>
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={5} align="start" className="w-48 p-1">
                {items.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            item.command(editor);
                            onOpenChange(false);
                        }}
                        className="flex cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-accent"
                    >
                        <div className="flex items-center space-x-2">
                            <div className="rounded-sm border p-1">
                                <item.icon className="h-3 w-3" />
                            </div>
                            <span>{item.title}</span>
                        </div>
                        {activeItem.title === item.title && <Check className="h-4 w-4" />}
                    </div>
                ))}
            </PopoverContent>
        </Popover>
    )
}