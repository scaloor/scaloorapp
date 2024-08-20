import Hero from "./_components/hero";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/app/app/(auth)/provider/authenticated-route";


export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hero />
    </main>
  );
}
