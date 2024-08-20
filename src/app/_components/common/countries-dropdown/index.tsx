/**
 * This code was retrieved from:
 * https://github.com/Jayprecode/country-state-dropdown
 */

"use client";
import React, { useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { ScrollArea, ScrollBar } from "@/app/_components/ui/scroll-area";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/app/_components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/_components/ui/popover";

import { cn } from "@/lib/utils";
import countries from "./countries.json";

import { type CountryProps } from "./types";
import { useDropdownStore } from "./dropdown";
import { UseFormReturn } from "react-hook-form";

interface CountryDropdownProps {
    disabled?: boolean;
    form?: UseFormReturn<any>
}

const lowerCase = (str: string): string => {
    return str.charAt(0).toLowerCase() + str.slice(1).toLowerCase();
};

const CountryDropdown = ({ disabled, form }: CountryDropdownProps) => {
    const { countryValue, setCountryValue, openCountryDropdown, setOpenCountryDropdown } = useDropdownStore();
    const C = countries as CountryProps[];

    useEffect(() => {
        if (!!form) {
            form.setValue('country', countryValue);
        }
    }, [countryValue]);

    return (
        <Popover open={openCountryDropdown} onOpenChange={setOpenCountryDropdown}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCountryDropdown}
                    className="w-full justify-between rounded-[6px] border !border-[#27272a] !bg-[#0f0f11] hover:!bg-[#0f0f11] focus:!bg-[#0f0f11] focus:!outline-none focus:!ring-2 focus:!ring-[#0f0f11] focus:!ring-offset-2 focus:!ring-offset-[#0f0f11]"
                    disabled={disabled}
                >
                    <span>
                        {countryValue ? (
                            <div className="flex items-end gap-2">
                                <span>
                                    {countries.find((country) => lowerCase(country.name) === countryValue)?.emoji}
                                </span>
                                <span>
                                    {countries.find((country) => lowerCase(country.name) === countryValue)?.name}
                                </span>
                            </div>
                        ) : (
                            <span>Select Country...</span>
                        )}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] rounded-[6px] border border-[#27272a] p-0">
                <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                        <ScrollArea className="h-[300px] w-full">
                            {C.map((country) => (
                                <CommandItem
                                    key={country.id}
                                    value={country.name}
                                    onSelect={(currentValue) => {
                                        setCountryValue(currentValue === lowerCase(country.name) ? currentValue : "");
                                        setOpenCountryDropdown(false);
                                    }}
                                    className="flex cursor-pointer items-center justify-between text-xs hover:!bg-[#27272a] hover:!text-white"
                                >
                                    <div className="flex items-end gap-2">
                                        <span>{country.emoji}</span>
                                        <span className="">{country.name}</span>
                                    </div>
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            countryValue === lowerCase(country.name) ? "opacity-100" : "opacity-0",
                                        )}
                                    />
                                </CommandItem>
                            ))}
                            <ScrollBar orientation="vertical" />
                        </ScrollArea>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default CountryDropdown;