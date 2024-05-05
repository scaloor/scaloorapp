import Link from "next/link"
import MaxWidthWrapper from "../max-width-wrapper"
import { NavigationOptions } from "./navigation-options"
import { auth } from "@/auth";


export default async function NavigationBar() {
    const session = await auth();

    return (
        <nav className="sticky h-14 inset-x-0 z-30 w-full border-b border-gray-200 bg-white/75 dark:bg-transparent backdrop-blur-lg transition-all px-3 md:px-0">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b border-zinc-200">
                    <Link href='/' className='flex z-40 font-semibold pl-5'>
                        <span>acme</span>
                    </Link>

                    {/* <MobileNavbar /> */}

                    <div className="hidden items-center space-x-4 sm:flex">
                        <>
                            <NavigationOptions isAuthenticated={!!session} />

                            {/* <ModeToggle /> */}
                        </>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav >
    )
}