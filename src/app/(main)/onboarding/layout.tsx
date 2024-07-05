import MaxWidthWrapper from "@/app/_components/common/max-width-wrapper";
import { getAuthUserDetails } from "@/server/actions/users";
import { redirect } from "next/navigation";


export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
    const user = await getAuthUserDetails();
    if (user && user.businessId) {
        return redirect('/account/settings')
    }
    return (
        <MaxWidthWrapper>
            <section className="mt-5">
                {children}
            </section>
        </MaxWidthWrapper>
    );
}