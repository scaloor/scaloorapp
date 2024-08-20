import { getAuthUserDetails } from "@/server/actions/users";
import AccountPage from "./account-page";
import { getBusinessById } from "@/server/data/business";
import ErrorPage from "@/app/_components/common/error-page";
import { getSubscriptionById } from "@/server/data/subscription";


export default async function Settings() {
  const { dbUser: user } = await getAuthUserDetails();
  if (!user) return <ErrorPage errorMessage="User not found" />
  const { dbBusiness: business } = await getBusinessById(user.businessId!)
  if (!business) return <ErrorPage errorMessage="Business not found" />
  const { dbSubscription: subscription } = await getSubscriptionById(business.currentSubscriptionId!)
  if (!subscription) return <ErrorPage errorMessage="Subscription not found" />
  return (
    <div className="flex w-full">
      <AccountPage
        user={user}
        business={business}
        subscription={subscription} />
    </div>
  )
}