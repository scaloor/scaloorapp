
import React from 'react'
import CreateBusinessForm from './create-business-form';
import { getAuthUserDetails } from '@/server/actions/protected/users';
import { redirect } from 'next/navigation';
import OnboardingSteps from '../onboarding-steps';
import { BriefcaseBusiness } from 'lucide-react';


export default async function AccountSetup() {
  const { dbUser: user } = await getAuthUserDetails();
  if (!user) {
    return redirect('/login')
  }
  if (user.businessId) {
    return redirect('/dashboard')
  }

  return (
    <div>
      <OnboardingSteps
        step={1}
        message='Create your Scaloor account'
        Icon={BriefcaseBusiness}
      />
      <CreateBusinessForm user={user} />
    </div>
  )
}