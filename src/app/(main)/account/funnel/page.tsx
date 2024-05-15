import { Button } from "@/app/_components/ui/button";
import Link from "next/link";


export default function Funnel() {
  return (
    <div className="flex-col justify-center text-center">
      <h1 className="text-4xl font-bold">Funnel Page here</h1>
      <Link href={'/editor'}>
        <Button className="mt-6">
          Editor
        </Button>
      </Link>
    </div>
  )
}