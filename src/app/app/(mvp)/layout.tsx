import MaxWidthWrapper from "@/app/_components/common/max-width-wrapper";

export default function MVPLayout({ children }: { children: React.ReactNode }) {
    return (
        <MaxWidthWrapper>
            <section>
                {children}
            </section>
        </MaxWidthWrapper>
    );
}