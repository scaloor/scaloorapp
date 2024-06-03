import { Button } from "@/app/_components/ui/button";
import { getFunnelById } from "@/server/data/funnnel";
import { getStagesByFunnelId } from "@/server/data/stage";
import Link from "next/link";


export default async function Funnel() {

  const funnel = await getFunnelById(10000) // This will be handled differently once the funnel page is created

  if (!funnel) {
    return <div>Funnel not found</div>
  }

  const stage = await getStagesByFunnelId(funnel.id);
  if (!stage) {
    return <div>Stage not found</div>
  }

  return (
    <div className="flex-col justify-center text-center">
      <h1 className="text-4xl font-bold">Funnel Page here</h1>
      <Link href={`/editor/${stage[0].id}`}>
        <Button className="mt-6">
          Editor
        </Button>
      </Link>
    </div>
  )
}