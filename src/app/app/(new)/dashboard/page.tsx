import React from 'react'
import { getAuthUserDetails } from '@/server/actions/users'
import ErrorPage from '@/app/_components/common/error-page';
import { getBusinessById } from '@/server/data/business';
import MaxWidthWrapper from '@/app/_components/common/max-width-wrapper';
import DomainStatusCard from './domain-status-card';
import StripeConnectCard from './stripe-connect-card';
import RecentFunnelsCard from './recent-funnels-card';
import { getRecentFunnels } from '@/server/actions/funnel';
import { funnel } from '@/server/db/schema';



export default async function DashboardPage() {
  const { dbUser } = await getAuthUserDetails();
  if (!dbUser) return <ErrorPage errorMessage="User not found" />
  const { dbBusiness } = await getBusinessById(dbUser.businessId!)
  if (!dbBusiness) return <ErrorPage errorMessage="Business not found" />
  const { funnels } = await getRecentFunnels({ businessId: dbBusiness.id! })
  if (!funnels) return <ErrorPage errorMessage="Funnel(s) not found" /> // WIP: Show a message that there are no funnels

  return (
    <MaxWidthWrapper>
      <div className='grid grid-cols-2 gap-4 mb-4'>
        <DomainStatusCard business={dbBusiness} />
        <StripeConnectCard business={dbBusiness} />
      </div>
      <RecentFunnelsCard funnels={funnels} />
    </MaxWidthWrapper>
  )
}