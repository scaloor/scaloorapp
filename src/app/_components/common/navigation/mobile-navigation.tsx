"use client"
import { Book, Menu, ShoppingCart, Tag, UserCircle } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
/* import { ModeToggle } from "@/app/components/ui/ModeToggle" */
import { LogoutButton } from "@/app/auth/_components/logout-button"
import type { Session } from "next-auth"
import { useSession } from "next-auth/react"
import { LoginButton } from "@/app/auth/_components/login-button"


/**
 * Renders the mobile navigation component for the application.
 * This component is responsible for displaying the mobile navigation menu, which includes options for signing out and navigating to different parts of the application.
 * The mobile navigation is only shown on small screens, and is toggled open and closed using a menu button.
 */
export const MobileNavigation = () => {

    const { data: session, status } = useSession();
    console.log(session)

    const [isOpen, setOpen] = useState<boolean>(false);

    const toggleOpen = () => setOpen((prev) => !prev);

    const pathname = usePathname();

    useEffect(() => {
        if (isOpen) toggleOpen()
    }, [pathname])

    const closeOnCurrent = (href: string) => {
        if (pathname === href) {
            toggleOpen()
        }
    }

    return (
        <div className="sm:hidden">
            <div className="flex justify-between items-center">
                {/* <div className="pr-3">
                    <ModeToggle />
                </div> */}
                <Menu
                    onClick={toggleOpen}
                    className="relative z-50 h-5 w-5 text-zinc-700 dark:text-white" />
            </div>
            {isOpen ? (
                <div className="fixed animate-in slide-in-from-dash-top-5 fade-in-20 inset-0 z-0 w-full">
                    <ul className="absolute bg-background border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8">
                        {!!session &&
                            <>
                                <li>
                                    <LogoutButton>
                                        <div className="flex items-center w-full font-semibold justify-between">
                                            Sign Out
                                        </div>
                                    </LogoutButton>
                                </li>
                            </>
                        }
                        {!session &&
                            <>
                                <li>
                                    <LoginButton asChild mode="redirect">
                                        <div className="flex items-center w-full font-semibold justify-between">
                                            Sign In
                                        </div>
                                    </LoginButton>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            ) : null
            }
        </div >
    )
}
