import React from 'react'
import ErrorPage from '@/app/_components/common/error-page';
import MaxWidthWrapper from '@/app/_components/common/max-width-wrapper';
import DomainStatusCard from './domain-status-card';
import StripeConnectCard from './stripe-connect-card';
import RecentFunnelsCard from './recent-funnels-card';
import { getDashboardDetailsAction } from '@/server/actions/protected/dashboard';

export default async function DashboardPage() {
  const { dbUser, dbBusiness, funnels, dbDomains, error } = await getDashboardDetailsAction()
  if (error) return <ErrorPage errorMessage={error} />
  if (!dbUser || !dbBusiness || !funnels) return <ErrorPage errorMessage="User not found" />
  
  return (
    <MaxWidthWrapper>
      <div className='grid grid-cols-2 gap-4 mb-4'>
        {/* <DomainStatusCard scaloorDomain={scaloorDomain} customDomain={customDomains} /> */}
        <StripeConnectCard business={dbBusiness} />
      </div>
      <RecentFunnelsCard funnels={funnels} />
    </MaxWidthWrapper>
  )
}