import MaxWidthWrapper from "@/app/_components/common/max-width-wrapper";


export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
    return (
        <MaxWidthWrapper>
            <section className="mt-5">
                {children}
            </section>
        </MaxWidthWrapper>
    );
}