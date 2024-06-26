import React from "react"
import AccountSidebar from "../_components/navigation/account-sidebar"


interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="flex h-screen overflow-hidden">
            <AccountSidebar />
            {/* Content */}
            {children}
        </div >


    )
}