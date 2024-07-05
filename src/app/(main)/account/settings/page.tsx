import { getAuthUserDetails } from "@/server/actions/users";
import AccountPage from "./account-page";
import { getBusinessById } from "@/server/data/business";


export default async function Settings() {
  const user = await getAuthUserDetails();
  if (!user) {
    return <div>User not found</div>
  }
  const business = await getBusinessById(user.businessId!)
  if (!business) {
    return <div>Business not found</div>
  }
  return (
    <div className="flex w-full">
      <AccountPage
        user={user}
        business={business} />
    </div>
  )
}