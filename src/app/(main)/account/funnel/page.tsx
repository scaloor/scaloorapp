import { Button } from "@/app/_components/ui/button";
import { getFunnelById, getFunnelsByBusinessId } from "@/server/data/funnels";
import { getStagesByFunnelId } from "@/server/data/stage";
import Link from "next/link";
import FunnelTable from "./funnel-table";
import { getAuthUserDetails } from "@/server/actions/users";
import ErrorPage from "@/app/_components/common/error-page";
import { columns } from "./funnel-table/columns";
import { FilterIcon, Plus } from "lucide-react";


export default async function Funnels() {

  const funnel = await getFunnelById(10000) // This will be handled differently once the funnel page is created
  if (!funnel) {
    return <ErrorPage errorMessage="Funnel not found" />
  }

  const user = await getAuthUserDetails();
  if (!user?.businessId) {
    return <ErrorPage errorMessage="User not found" />
  }

  const funnels = await getFunnelsByBusinessId(user.businessId);

  const stage = await getStagesByFunnelId(funnel.id);
  if (!stage) {
    return <div>Stage not found</div>
  }

  return (
    <>
      <div className="flex-col justify-center text-center">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-4xl font-bold">Funnels</h1>
          <Link href={`/editor/${stage[0].id}`}>
            <Button className="dark:text-white">
              Create New Funnel
              <Plus className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="px-2">
        <FunnelTable columns={columns} data={funnels} />
      </div>
    </>
  )
}