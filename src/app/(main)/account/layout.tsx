import React from "react"
import AccountSidebar from "../_components/navigation/account-sidebar"
import { getAuthUserDetails } from "@/server/actions/users"
import { redirect } from "next/navigation"
import { getBusinessById } from "@/server/data/business"
import AccountLayout from "../_components/navigation/account-layout"


interface SettingsLayoutProps {
    children: React.ReactNode
}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="flex h-screen overflow-hidden w-full">
            <AccountLayout>
                <div className="w-full">
                    {children}
                </div>
            </AccountLayout>
        </div >


    )
}