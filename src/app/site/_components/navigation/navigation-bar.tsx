import Link from "next/link"
import Image from "next/image";
import MaxWidthWrapper from "../../../_components/common/max-width-wrapper"
import { NavigationOptions } from "./navigation-options"
import { createClient } from "@/lib/supabase/server";


export default async function NavigationBar() {
    return (
        <nav className="sticky h-14 inset-x-0 z-30 w-full border-b border-gray-200 bg-background backdrop-blur-lg transition-all px-3 md:px-0">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b border-zinc-200">
                    <Link href='/' className='flex z-40 font-bold pl-5'>
                        <span className="text-2xl pr-5">scaloor</span>
                        <Image
                            src={"/assets/scaloor_graph-removebg-preview.png"}
                            height={30}
                            width={30}
                            alt={"Scaloor logo"}
                        />
                    </Link>
                    <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/login`} className='flex z-40 font-bold pl-5'>
                        Login
                    </Link>
                    {/* <MobileNavigation /> */}

                    {/* <div className="hidden items-center space-x-4 sm:flex">
                        <>
                            <NavigationOptions isAuthenticated={false} />

                            {/* <ModeToggle />
                        </>
                    </div> */}
                </div>
            </MaxWidthWrapper>
        </nav >
    )
}