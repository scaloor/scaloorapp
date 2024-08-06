import { getAuthUserDetails } from "@/server/actions/users";
import BillingForm from "./billing-form";
import ErrorPage from "@/app/_components/common/error-page";
import { getBusinessById } from "@/server/data/business";
import { getSubscriptionById } from "@/server/data/subscription";


export default async function Billing() {
  const { dbUser: user } = await getAuthUserDetails();
  if (!user) return <ErrorPage errorMessage="User not found" />
  const { dbBusiness: business } = await getBusinessById(user.businessId!)
  if (!business) return <ErrorPage errorMessage="Business not found" />
  const { dbSubscription: subscription } = await getSubscriptionById(business.currentSubscriptionId!)
  if (!subscription) return <ErrorPage errorMessage="Subscription not found" />

  return (
    <BillingForm subscription={subscription} />
  )
}