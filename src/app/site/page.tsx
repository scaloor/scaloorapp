import Hero from "./_components/hero";
import Benefits from "./_components/benefits";
import MaxWidthWrapper from "../_components/common/max-width-wrapper";
import Features from "./_components/features";
import FAQ from "./_components/faq";
import Waitlist from "./_components/waitlist";


export default async function Home() {
  return (
    <div className="flex-1">
      <MaxWidthWrapper>
        <Hero />
        <Waitlist />
        <Benefits />
        <Features />
        <FAQ />
      </MaxWidthWrapper>
    </div>
  );
}
