import AccountPage from "./account-page";
import ErrorPage from "@/app/_components/common/error-page";
import MaxWidthWrapper from "@/app/_components/common/max-width-wrapper";
import { getSettingsDetailsAction } from "@/server/actions/protected/settings";


export default async function Settings() {
  const { user, business, subscription, error } = await getSettingsDetailsAction()
  if (error) return <ErrorPage errorMessage={error} />
  if (!user || !business || !subscription) return <ErrorPage errorMessage="User not found" />
  return (
    <MaxWidthWrapper className="flex flex-col w-full">
      <div>
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">Settings</h1>
        <div className="w-full h-px bg-gray-200 mb-4"></div>
      </div>
      <AccountPage
        user={user}
        business={business}
        subscription={subscription} />
    </MaxWidthWrapper>
  )
}