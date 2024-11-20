import { SidebarProvider, SidebarTrigger } from "@/app/_components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";


export default function MVPLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full h-full">
                <SidebarTrigger />
                <section className="p-4">
                    {children}
                </section>
            </main>
        </SidebarProvider>
    );
}