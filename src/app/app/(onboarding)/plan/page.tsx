import React from 'react'
import OnboardingSteps from '../onboarding-steps'
import { Lock } from 'lucide-react'
import PlanForm from './plan-form'

export default function PlanPage() {
    return (
        <div>
            <OnboardingSteps
                step={2}
                message='Payment details'
                Icon={Lock}
            />
            <PlanForm />
        </div>
    )
}