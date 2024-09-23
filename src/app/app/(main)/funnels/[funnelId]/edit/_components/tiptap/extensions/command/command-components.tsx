'use client'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/app/_components/ui/command";
import { FC, useRef } from "react"
import { useState, useEffect } from 'react';
import { EditorCommandItem } from "./command-items";
import { useFunnelEditor } from "../../../editor-provider";
import { defaultThankYouPage } from "../../../editor-provider/defaults";
import { FilePlus2, ShoppingCartIcon } from "lucide-react";
import { Editor, useCurrentEditor } from "@tiptap/react";

/**
 * The command extension requires 5 components which are extended from shadcn
 * 
 * 1. CommandOut (taken from novel example)
 * 2. Command (Root component)
 * 3. CommandEmpty (Empty state)
 * 4. CommandGroup (Group of commands)
 * 5. CommandItem (Single command)
 */

interface CommandListProps {
    items: EditorCommandItem[];
    command: (item: EditorCommandItem) => void;
    query: string;
}

const CommandOut: FC<CommandListProps> = ({ items, command, query }) => {
    // May not need this, will adjust once I know how to use the enter key for selection
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { state, dispatch } = useFunnelEditor();
    const commandRef = useRef<HTMLDivElement>(null);
    const { editor } = useCurrentEditor()
    

    useEffect(() => {
        setSelectedIndex(0);
    }, [items]);

    useEffect(() => {
        const navigationKeys = ["ArrowUp", "ArrowDown", "Enter"];
        const onKeyDown = (e: KeyboardEvent) => {
            if (navigationKeys.includes(e.key)) {
                e.preventDefault();
                const commandRef = document.querySelector("#editor-command");

                if (commandRef)
                    commandRef.dispatchEvent(
                        new KeyboardEvent("keydown", {
                            key: e.key,
                            cancelable: true,
                            bubbles: true,
                        }),
                    );

                return false;
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);


    /*
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            const navigationKeys = ["ArrowUp", "ArrowDown", "Enter"];
            // TODO: Fix enter key for selection
            //console.log('event', event)
            if (navigationKeys.includes(event.key)) {
                event.preventDefault();
                switch (event.key) {
                    case "ArrowUp":
                        setSelectedIndex((prevIndex) =>
                            (prevIndex - 1 + items.length) % items.length
                        );
                        break;
                    case "ArrowDown":
                        setSelectedIndex((prevIndex) =>
                            (prevIndex + 1) % items.length
                        );
                        break;
                    case "Enter":
                        selectItem(selectedIndex);
                        break;
                    default:
                        break;
                }
            }
        };
        // This prevents the default behavior of the arrow keys and enter key
        // Enter key currently not working
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [items, selectedIndex]); // Add dependencies
    */


    const selectItem = (index: number) => {
        const item = items[index];
        if (item) {
            command(item);
        }
    };

    const addNewPage = (editor: Editor) => {
        const { $from } = editor.state.selection
        const start = $from.start()
        const end = $from.pos
        editor.chain().focus().deleteRange({ from: start, to: end }).setNode('paragraph').run()
        dispatch({ type: 'ADD_PAGE', page: defaultThankYouPage(state.funnelId, state.pages.length + 1) })
    }

    if (!editor) return null

    return (
        <>
            <Command
                ref={commandRef}
                onKeyDown={(e) => {
                    e.stopPropagation();
                }}
                id="editor-command"
                className="z-50 h-auto max-h-[500px] w-[300px] overflow-y-auto rounded-lg border shadow-md transition-all"
            >
                <CommandInput
                    value={query}
                    searchIcon={false}
                    className="hidden"
                />
                <CommandEmpty>No results found</CommandEmpty>
                <CommandList>
                    <CommandGroup heading="Design Blocks">
                        {items.map((item, index) => (
                            <CommandItem
                                key={index}
                                onSelect={() => selectItem(index)}
                                className="flex items-start w-full rounded-md py-2 text-sm aria-selected:bg-zinc-200 aria-selected:text-inherit aria-selected:font-normal dark:aria-selected:bg-zinc-800 dark:aria-selected:text-black"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background text-foreground">
                                    <item.icon />
                                </div>
                                <div className="flex flex-col items-start pl-2">
                                    <span className="text-sm text-foreground">{item.title}</span>
                                    {item.description && <span className="text-xs text-zinc-500">{item.description}</span>}
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Funnel Options">
                        <CommandItem
                            onSelect={() => addNewPage(editor)}
                            className="flex items-start w-full rounded-md py-2 text-sm aria-selected:bg-zinc-200 aria-selected:text-inherit aria-selected:font-normal dark:aria-selected:bg-zinc-800 dark:aria-selected:text-black"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background text-foreground">
                                <FilePlus2 />
                            </div>
                            <div className="flex flex-col items-start pl-2">
                                <span className="text-sm text-foreground">Add New Page</span>
                                <span className="text-xs text-zinc-500">Create a new page in the funnel</span>
                            </div>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => {
                                const { $from } = editor.state.selection
                                const start = $from.start()
                                const end = $from.pos
                                editor.chain().focus().deleteRange({ from: start, to: end }).setNode('checkout').run()

                            }}
                            className="flex items-start w-full rounded-md py-2 text-sm aria-selected:bg-zinc-200 aria-selected:text-inherit aria-selected:font-normal dark:aria-selected:bg-zinc-800 dark:aria-selected:text-black"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background text-foreground">
                                <ShoppingCartIcon />
                            </div>
                            <div className="flex flex-col items-start pl-2">
                                <span className="text-sm text-foreground">Add Checkout</span>
                                <span className="text-xs text-zinc-500">Add a checkout page to the funnel</span>
                            </div>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </>
    );
};

export { CommandList, CommandOut };
