'use client'
import { Command, CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup } from '@/app/_components/ui/command'
import { useState, useRef, useEffect } from 'react'

type DomainCommandboxProps = {}

// This can be used in the view funnel page to assign domains to a funnel
export default function DomainCommandbox({ }: DomainCommandboxProps) {
    const [open, setOpen] = useState(false)
    // This is some crazy react stuff to get the width of the input
    // super cool.
    const [inputWidth, setInputWidth] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current) {
            setInputWidth(inputRef.current.offsetWidth)
        }
    }, [])

    return (
        <Command>
            <CommandInput
                ref={inputRef}
                searchIcon
                placeholder="Search domains..."
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
            />
            {open && (
                <CommandList
                    className="absolute mt-[44px] bg-white shadow-md rounded-md z-50"
                    style={{ width: `${inputWidth}px` }}
                >
                    <CommandEmpty>No domains found</CommandEmpty>
                    <CommandGroup>
                        <CommandItem className="aria-selected:bg-zinc-200 aria-selected:text-black aria-selected:font-normal"                        >
                            example.com
                        </CommandItem>
                        <CommandItem>google.com</CommandItem>
                        <CommandItem>scaloor.com</CommandItem>
                    </CommandGroup>
                </CommandList>
            )}
        </Command>
    )
}