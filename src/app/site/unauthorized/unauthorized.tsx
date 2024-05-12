'use client';

import { Button } from "@/app/_components/ui/button";
import Link from "next/link";



export default function UnauthorizedForm() {
    return (
        <div className="p-4 text-center flex justify-center items-center align-middle flex-col h-screen w-full">
            <h1 className="text-3xl md:text-6xl">Unauthorized access!</h1> 
            <p>Please contact support or your agency owner to get access</p>
            <Button className="mt-4 bg-primary p-2" >
                <Link href="/">
                    Back to home
                </Link>
            </Button>
        </div>
    )
}