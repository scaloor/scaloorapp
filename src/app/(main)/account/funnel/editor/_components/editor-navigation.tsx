'use client';

import { TooltipProvider } from "@/app/_components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
    // Funnel ID goes here
    // Account ID maybe goes here
}

export default function EditorNavigation({ }: Props) {
    /* const router = useRouter(); */
    return (
        <TooltipProvider>
            <nav className='border-b-[1px] flex items-center justify-between p-6 gap-2 transition-all bg-background overflow-hidden'>
                <aside className="flex items-center gap-4 max-w-[260px] w-[300px]">
                    <Link href={'/account/funnel'}>
                        <ArrowLeftCircle />
                    </Link>
                </aside>
            </nav>
        </TooltipProvider>
    )
}