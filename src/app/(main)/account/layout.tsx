import React from "react"
import AccountSidebar from "../_components/navigation/account-sidebar"
import { getAuthUserDetails } from "@/server/actions/users"
import { redirect } from "next/navigation"
import { NavigationBar } from "../_components/navigation/navigation-bar"


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
            <AccountSidebar
                first_name={user.firstName}
                last_name={user.lastName}
            />
            {/* Content */}
            <div className="mt-20 w-full">
                {children}
            </div>
        </div >


    )
}