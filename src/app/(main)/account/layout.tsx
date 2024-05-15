import { Sidebar } from "@/app/(main)/_components/navigation/sidebar"
import { NavigationBar } from "@/app/(main)/_components/navigation/navigation-bar"
import { BlurPage } from "../_components/blur-page"


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
                    <BlurPage>
                        {children}
                    </BlurPage>
                </div>
            </div>
        </div>


    )
}