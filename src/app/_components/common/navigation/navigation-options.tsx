"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/app/_components/ui/navigation-menu"
import { auth } from "@/auth"
import { LoginButton } from "@/app/auth/components/login-button"
import { Button, buttonVariants } from "@/app/_components/ui/button"
import { UserCircle } from "lucide-react"
import { LogoutButton } from "@/app/auth/components/logout-button"

const SHADCN_BASE_URL = "https://ui.shadcn.com/"

const components: { title: string; href: string; target: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: `${SHADCN_BASE_URL}/docs/primitives/alert-dialog`,
        target: "_blank",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: `${SHADCN_BASE_URL}/docs/primitives/hover-card`,
        target: "_blank",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: `${SHADCN_BASE_URL}/docs/primitives/progress`,
        target: "_blank",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: `${SHADCN_BASE_URL}/docs/primitives/scroll-area`,
        target: "_blank",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: `${SHADCN_BASE_URL}/docs/primitives/tabs`,
        target: "_blank",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: `${SHADCN_BASE_URL}/docs/primitives/tooltip`,
        target: "_blank",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

export function NavigationOptions({ isAuthenticated }: { isAuthenticated: boolean }) {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href={SHADCN_BASE_URL}
                                        target="_blank"
                                    >
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            shadcn/ui
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Beautifully designed components that you can copy and
                                            paste into your apps. Accessible. Customizable. Open
                                            Source.
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href={`${SHADCN_BASE_URL}/docs`} target="_blank" title="Introduction">
                                Re-usable components built using Radix UI and Tailwind CSS.
                            </ListItem>
                            <ListItem href={`${SHADCN_BASE_URL}/docs/installation`} target="_blank" title="Installation">
                                How to install dependencies and structure your app.
                            </ListItem>
                            <ListItem href={`${SHADCN_BASE_URL}/docs/primitives/typography`} target="_blank" title="Typography">
                                Styles for headings, paragraphs, lists...etc
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                    target={component.target}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href={`${SHADCN_BASE_URL}/docs`} legacyBehavior passHref>
                        <NavigationMenuLink target="_blank" className={navigationMenuTriggerStyle()}>
                            Documentation
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                {!isAuthenticated &&
                    <LoginButton asChild mode="redirect">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Sign In
                        </NavigationMenuLink>
                    </LoginButton>
                }
                {!!isAuthenticated &&
                    <>
                        <Link  href='/profile' legacyBehavior passHref>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-background-primary")}>
                                Profile
                            </NavigationMenuLink>
                        </Link>
                        <LogoutButton>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Sign Out
                            </NavigationMenuLink>
                        </LogoutButton>
                    </>
                }
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
