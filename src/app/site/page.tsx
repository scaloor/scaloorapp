import { getAuthUserDetails } from "@/server/actions/users";
import Image from "next/image";

export default async function Home() {
  const user = await getAuthUserDetails();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-6xl bg-gradient text-transparent bg-clip-text font-bold">Some incredible copy here.</h1>
    </main>
  );
}
