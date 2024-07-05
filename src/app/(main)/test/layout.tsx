import AccountSideBar from "./account-sidebar";
import AccountTopNav from "./account-topnav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <AccountSideBar />
            <AccountTopNav >
                <main className="flex flex-col gap-4 p-4 lg:gap-6">
                    {children}
                </main>
            </AccountTopNav>
        </div>
    );
}