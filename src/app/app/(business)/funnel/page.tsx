import { Button } from "@/app/_components/ui/button";
import { getFunnelById, getFunnelsByBusinessId } from "@/server/data/funnels";
import { getStagesByFunnelId } from "@/server/data/stage";
import Link from "next/link";
import { getAuthUserDetails } from "@/server/actions/users";
import ErrorPage from "@/app/_components/common/error-page";
import { funnelColumns } from "./[funnelId]/_components/columns";
import CreateFunnelDialog from "./_components/create-funnel-dialog";
import { DataTable } from "@/app/_components/ui/data-table";


export default async function Funnels() {
  const { dbUser } = await getAuthUserDetails();
  if (!dbUser?.businessId) return <ErrorPage errorMessage="User not found" />

  const { funnels } = await getFunnelsByBusinessId(dbUser.businessId);
  if (!funnels) return <ErrorPage errorMessage="Funnel(s) not found" />

  return (
    <div>
      <div className="flex-col justify-center text-center">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-4xl font-bold">Funnels</h1>
          <CreateFunnelDialog businessId={dbUser.businessId} />
        </div>
      </div>
      <div className="px-2">
        <DataTable columns={funnelColumns} data={funnels} />
      </div>
    </div>
  )
}