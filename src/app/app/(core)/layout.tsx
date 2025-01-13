import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/app/_components/ui/sidebar";
import { AppSidebar } from "./_components/navigation/app-sidebar";
import { AppTopbar } from "./_components/navigation/app-topbar";


export default function MVPLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppTopbar />
                <main className="w-full h-full">
                    <section className="p-4">
                        {children}
                    </section>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}