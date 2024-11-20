import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { DataTable } from "@/app/_components/ui/data-table";
import { columns } from "./checkout-columns";
import { getCheckoutsByBusinessIdAction } from "@/server/actions/protected/checkout";
import { getAuthUserDetails } from "@/server/actions/protected/users";

export default async function ProductPage() {
  const { dbUser } = await getAuthUserDetails();
  if (!dbUser?.businessId) return null;

  const { dbCheckouts } = await getCheckoutsByBusinessIdAction(dbUser.businessId);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/products/add">
          <Button>
            Create Product
          </Button>
        </Link>
      </div>
      <div className="w-full h-px bg-gray-200 mb-4"></div>
      <DataTable
        columns={columns}
        data={dbCheckouts || []}
      />
    </div >
  );
}