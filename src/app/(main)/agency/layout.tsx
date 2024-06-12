import { ResizableSidebar } from "./resizeable-sidebar";
import { getAuthUserDetails } from "@/server/actions/users";
import { getBusinessById } from "@/server/data/business";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getAuthUserDetails();
    if (!user?.businessId) {
        console.log('User does not have a business!')
        throw Error
    }

    const business = await getBusinessById(user.businessId)

    if (!business) {
        return
    }

    return (
        <section className="flex h-screen">
            <ResizableSidebar business={business}>
                {children}
            </ResizableSidebar>
        </section >
    );
}