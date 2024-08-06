import React from "react"
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