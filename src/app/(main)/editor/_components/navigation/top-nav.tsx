'use client';

import { Button } from "@/app/_components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/_components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ArrowLeftCircle, EyeIcon, EyeOff, Laptop, Redo2, Smartphone, Tablet, Undo2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import ExitPreviewButton from "../exit-preview-button";

type Props = {
    // Funnel ID goes here
    // Account ID maybe goes here
}

export default function EditorNavigation({ }: Props) {
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    /* const router = useRouter(); */


    return (
        <TooltipProvider>
            <nav className={cn('border-b-[1px] grid grid-cols-3 transition-all bg-background overflow-hidden h-[50px]',
                { '!h-0 !p-0 !overflow-hidden': isPreviewMode }
            )}>
                {!!isPreviewMode && (
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        className="w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]"
                        onClick={() => { setIsPreviewMode(!isPreviewMode) }}
                    >
                        <EyeOff />
                        <ExitPreviewButton />
                    </Button>
                )}
                <aside className="flex justify-start items-center gap-4 max-w-[260px] w-[300px]">
                    <Link href={'/account/funnel'} className="">
                        <ArrowLeftCircle className="ml-4" />
                    </Link>
                    {/* Funnel Name editor here */}
                </aside>
                <aside className="flex justify-center">
                    <Tabs
                        defaultValue="Desktop"
                        className="flex w-fit justify-center"
                    >
                        <TabsList className="grid w-full grid-cols-3 bg-transparent h-fit">
                            <Tooltip>
                                <TooltipTrigger>
                                    <TabsTrigger
                                        value="Desktop"
                                        className="data-[state=active]:bg-muted w-10 h-10 p-0"
                                    >
                                        <Laptop />
                                    </TabsTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Desktop</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <TabsTrigger
                                        value="Tablet"
                                        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                                    >
                                        <Tablet />
                                    </TabsTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Tablet</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <TabsTrigger
                                        value="Mobile"
                                        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                                    >
                                        <Smartphone />
                                    </TabsTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Mobile</p>
                                </TooltipContent>
                            </Tooltip>
                        </TabsList>
                    </Tabs>
                </aside>
                <aside className="flex justify-end items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger>
                            <Button
                                variant={'ghost'}
                                size={'icon'}
                                className="hover:bg-slate-800"
                                onClick={() => { setIsPreviewMode(!isPreviewMode) }}
                            >
                                <EyeIcon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Preview stage</p>
                        </TooltipContent>
                    </Tooltip>
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        className="hover:bg-slate-800"
                    >
                        <Undo2 />
                    </Button>
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        className="hover:bg-slate-800 mr-4"
                    >
                        <Redo2 />
                    </Button>
                </aside>
            </nav>
        </TooltipProvider>
    )
}