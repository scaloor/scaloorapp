
import React from 'react'
import CreateBusinessForm from './create-business-form';
import { getAuthUserDetails } from '@/server/actions/users';
import { redirect } from 'next/navigation';
import { getBusinessById } from '@/server/data/business';
import OnboardingSteps from '../onboarding-steps';
import { BriefcaseBusiness } from 'lucide-react';


export default async function AccountSetup() {
  const user = await getAuthUserDetails();
  if (!user) {
    return redirect('/auth/login')
  }
  
  return (
    <div>
      <OnboardingSteps
        step={1}
        message='Create your business account'
        Icon={BriefcaseBusiness}
      />
      <CreateBusinessForm user={user} />
    </div>
  )
}