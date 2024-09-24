import Hero from "./_components/hero";
import Benefits from "./_components/benefits";
import MaxWidthWrapper from "../_components/common/max-width-wrapper";
import Features from "./_components/features";
import FAQ from "./_components/faq";


export default async function Home() {
  return (
    <main className="flex-1">
      <MaxWidthWrapper>
        <Hero />
        <Benefits />
        <Features />
        <FAQ />
      </MaxWidthWrapper>
    </main>
  );
}
