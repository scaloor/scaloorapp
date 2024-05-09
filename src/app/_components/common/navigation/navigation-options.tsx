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
import { LoginButton } from "@/app/auth/components/login-button"
import { LogoutButton } from "@/app/auth/components/logout-button"

export function NavigationOptions({ isAuthenticated }: { isAuthenticated: boolean }) {
    return (
        <NavigationMenu>
            <NavigationMenuList>
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
