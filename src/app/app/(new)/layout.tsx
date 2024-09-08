import React from "react"
import AccountLayout from "@/app/app/_components/navigation/account-layout"
import AuthenicatedRoute from "@/app/app/(auth)/provider/authenticated-route";


interface SettingsLayoutProps {
    children: React.ReactNode
}

export default async function BusinessLayout({ children }: SettingsLayoutProps) {
    return (
        <AuthenicatedRoute>
            <div className="flex h-screen overflow-hidden w-full">
                <AccountLayout>
                    <div className="w-full">
                        {children}
                    </div>
                </AccountLayout>
            </div >
        </AuthenicatedRoute>
    )
}