import { getAuthUserDetails } from "@/server/actions/users";
import Image from "next/image";
import Hero from "./_components/hero";

export default async function Home() {
  const user = await getAuthUserDetails();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Hero />
    </main>
  );
}
