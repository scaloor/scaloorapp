import AuthenicatedRoute from "@/app/app/(auth)/provider/authenticated-route";
import React from "react";


export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}