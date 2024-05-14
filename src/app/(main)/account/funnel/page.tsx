import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { BlurPage } from "../../_components/blur-page";


export default function Funnel() {
  return (
    <BlurPage>
      <div className="flex-col justify-center text-center">
        <h1 className="text-4xl font-bold">Funnel Page here</h1>
        <Link href={'/account/funnel/editor'}>
          <Button className="mt-6">
            Editor
          </Button>
        </Link>
      </div>
    </BlurPage>
  )
}