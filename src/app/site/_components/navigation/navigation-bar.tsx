"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import MaxWidthWrapper from "@/app/_components/common/max-width-wrapper";
import { Button } from "@/app/_components/ui/button";

export default function Navbar({ className }: { className?: string }) {
    const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            className={cn(
                "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm",
                className
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <MaxWidthWrapper className="flex justify-between items-center h-14 px-4 ">
                <div>
                    <Link href="/" className={'flex items-center'}>
                        <Image src="/assets/favicon-16x16.png" alt="Scaloor" width={16} height={16} className="mr-2" />
                        <span className="font-bold">Scaloor</span>
                    </Link>
                </div>
                <div>
                    <Link href="#benefits" onClick={(e) => smoothScroll(e, 'benefits')}>
                        <Button variant="ghost">
                            Features
                        </Button>
                    </Link>
                    <Link href="/site/pricing">
                        <Button variant="ghost">
                            Pricing
                        </Button>
                    </Link>
                    <Link href="#faq" onClick={(e) => smoothScroll(e, 'faq')}>
                        <Button variant="ghost">
                            FAQ
                        </Button>
                    </Link>
                </div>
                <div>
                    <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/login`}>
                        <Button>
                            Login
                        </Button>
                    </Link>
                </div>
            </MaxWidthWrapper>
        </motion.div>
    );
}