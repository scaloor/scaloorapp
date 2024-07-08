import { getAuthUserDetails } from "@/server/actions/users";
import AccountSidebar from "./account-sidebar";
import AccountTopbar from "./account-topbar";
import { AccountNavigationProvider } from "./navigation-provider";
import { redirect } from "next/navigation";
import { getBusinessById } from "@/server/data/business";
import ErrorPage from "@/app/_components/common/error-page";


export default async function AccountLayout({ children }: { children: React.ReactNode }) {
    const user = await getAuthUserDetails();
    if (!user?.businessId || !user) {
        redirect('/onboarding/create-business');
    }
    const business = await getBusinessById(user.businessId)
    if (!business) {
        return <ErrorPage errorMessage="Business not found" />
    }
    if (!business.currentSubscriptionId) {
        redirect('/onboarding/cancel');
    }
    return (
        <AccountNavigationProvider>
            <AccountSidebar
                firstName={user.firstName}
                lastName={user.lastName}
                businessName={business.name}
            />
            <AccountTopbar>
                <div className="flex flex-col gap-4 p-4 lg:gap-6">
                    {children}
                </div>
            </AccountTopbar>
        </AccountNavigationProvider>
    );
}