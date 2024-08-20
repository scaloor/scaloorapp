import MaxWidthWrapper from "@/app/_components/common/max-width-wrapper";
import AuthenicatedRoute from "@/app/app/(auth)/provider/authenticated-route";


export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthenicatedRoute>
            <MaxWidthWrapper>
                <section className="mt-5">
                    {children}
                </section>
            </MaxWidthWrapper>
        </AuthenicatedRoute>
    );
}