import { getAuthUserDetails } from "@/server/actions/users";
import { redirect } from "next/navigation";


export default async function Account() {
  const user = await getAuthUserDetails();
  if (!!user && !user.businessId) {
    redirect('/account-setup')
  }
  return (
    <div>
      Account
    </div>
  )
}