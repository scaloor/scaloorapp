'use client';

import { Button } from "@/app/_components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/_components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ArrowLeftCircle, EyeIcon, EyeOff, Laptop, Redo2, Smartphone, Tablet, Undo2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
    // Funnel ID goes here
    // Account ID maybe goes here
}

export default function EditorNavigation({ }: Props) {
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    /* const router = useRouter(); */


    return (
        <TooltipProvider>
            <nav className={cn('border-b-[1px] flex items-center justify-between p-6 gap-2 transition-all bg-background overflow-hidden',
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
                    </Button>
                )}
                <aside className="flex items-center gap-4 max-w-[260px] w-[300px]">
                    <Link href={'/account/funnel'}>
                        <ArrowLeftCircle />
                    </Link>
                    {/* Funnel Name editor here */}
                </aside>
                <aside>
                    <Tabs
                        defaultValue="Desktop"
                        className="w-fit"
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
                <aside className="flex items-center gap-2">
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        className="hover:bg-slate-800"
                        onClick={() => { setIsPreviewMode(!isPreviewMode) }}
                    >
                        <EyeIcon />
                    </Button>
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