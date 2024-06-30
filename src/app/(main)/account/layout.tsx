import React from "react"
import AccountSidebar from "../_components/navigation/account-sidebar"
import { getAuthUserDetails } from "@/server/actions/users"
import { redirect } from "next/navigation"


interface SettingsLayoutProps {
    children: React.ReactNode
}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {
    const user = await getAuthUserDetails()
    if (!user?.businessId || !user) {
        redirect('/account-setup');
    }
    
    return (
        <div className="flex h-screen overflow-hidden">
            <AccountSidebar />
            {/* Content */}
            {children}
        </div >


    )
}