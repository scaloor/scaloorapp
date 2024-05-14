import { Sidebar } from "@/app/(main)/_components/navigation/sidebar"
import { NavigationBar } from "@/app/(main)/_components/navigation/navigation-bar"


interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="h-screen overflow-hidden">
            <Sidebar type="BUSINESS" />
            <div className="md:pl-[300px]">
                <NavigationBar />
                <div className="relative">
                    {children}
                </div>
            </div>
        </div>


    )
}