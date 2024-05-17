
import { ReactNode, useState } from "react";
import { ResizableSidebar } from "./resizeable-sidebar";
import { getAuthUserDetails } from "@/server/actions/users";
import { getBusinessById } from "@/server/data/business";

interface MenuBarWrapperProps {
    isLoading: boolean
    isBlocking?: boolean
    productMenu?: ReactNode
    children: ReactNode
}

/* const MenuBarWrapper = ({
    isLoading,
    isBlocking = true,
    productMenu,
    children,
}: MenuBarWrapperProps) => {
    const router = useRouter()
    const selectedProject = useSelectedProject()
    const requiresProjectDetails = !routesToIgnoreProjectDetailsRequest.includes(router.pathname)

    if (!isBlocking) {
        return children
    }

    const showMenuBar =
        !requiresProjectDetails || (requiresProjectDetails && selectedProject !== undefined)

    return !isLoading && productMenu && showMenuBar ? children : null
} */


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
            <ResizableSidebar
                children
                business={business}
            />
        </section >
    );
}