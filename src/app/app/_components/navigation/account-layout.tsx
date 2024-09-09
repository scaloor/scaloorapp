import { getAuthUserDetails } from "@/server/actions/users";
import AccountSidebar from "./account-sidebar";
import AccountTopbar from "./account-topbar";
import { AccountNavigationProvider } from "./navigation-provider";
import { redirect } from "next/navigation";
import { getBusinessById } from "@/server/data/business";
import ErrorPage from "@/app/_components/common/error-page";


export default async function AccountLayout({ children }: { children: React.ReactNode }) {
    const { dbUser: user } = await getAuthUserDetails();
    if (!user?.businessId || !user) {
        redirect('/create-business');
    }
    const { dbBusiness: business } = await getBusinessById(user.businessId)
    if (!business) {
        return <ErrorPage errorMessage="Business not found" />
    }
    if (!business.currentSubscriptionId) {
        redirect('/cancel');
    }
    return (
        <AccountNavigationProvider>
            <AccountSidebar
                firstName={user.firstName}
                lastName={user.lastName}
                businessName={business.name}
            />
            <AccountTopbar>
                {children}
            </AccountTopbar>
        </AccountNavigationProvider>
    );
}