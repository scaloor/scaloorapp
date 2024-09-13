'use client'

import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/app/_components/ui/command";
import { Component, FC } from "react"
import React, { useState, useEffect } from 'react';
import { EditorCommandItem } from "./command-items";
import { cn } from "@/lib/utils";

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
}

const CommandOut: React.FC<CommandListProps> = ({ items, command }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        setSelectedIndex(0);
    }, [items]);

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



    const selectItem = (index: number) => {
        const item = items[index];
        if (item) {
            command(item);
        }
    };

    return (
        <Command
            // Remove onKeyDown prop from here
            className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all"
        >
            <CommandEmpty>No results found</CommandEmpty>
            <CommandList>
                {items.map((item, index) => (
                    <CommandItem
                        key={index}
                        onSelect={() => selectItem(index)}
                        className={cn(
                            "flex flex-col items-start w-full space-x-2 rounded-md px-2 py-1 text-sm",
                            "hover:bg-zinc-200",
                            "aria-selected:bg-transparent aria-selected:text-inherit",
                            index === selectedIndex ? 'bg-zinc-200 text-black font-medium' : ''
                        )}
                    >
                        {item.element || item.title}
                        {item.description && <span className="text-sm text-zinc-500">{item.description}</span>}
                    </CommandItem>
                ))}
            </CommandList>
        </Command>
    );
};

export { CommandList, CommandOut };
