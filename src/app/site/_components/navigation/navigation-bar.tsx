"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/app/_components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";


export default function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (

        <div
            className={cn(
                "fixed top-10 inset-x-0 md:max-w-2xl lg:max-w-4xl mx-auto z-50",
                className,
                "hidden md:block"
            )}
        >
            <div className="flex justify-between">
                <Menu
                    className=""
                    setActive={setActive}
                >
                    <HoveredLink href="/" className="flex items-center space-x-2">
                        <Image src="/assets/favicon-16x16.png" alt="Scaloor" width={16} height={16} />
                        <span className="">Scaloor</span>
                    </HoveredLink>
                </Menu>
                <div className="inset-x-0 max-w-2xl mx-10 z-50">
                    <Menu setActive={setActive}>
                        <HoveredLink href="#benefits">Benefits</HoveredLink>
                        <HoveredLink href="/site/pricing">Pricing</HoveredLink>
                        <HoveredLink href="#faq">FAQ</HoveredLink>
                    </Menu>
                </div>
                <Menu
                    setActive={setActive}
                >
                    <HoveredLink href={`${process.env.NEXT_PUBLIC_APP_URL}/login`}>Login</HoveredLink>
                </Menu>
            </div>
        </div>
    );
}