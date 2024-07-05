import React from 'react'
import OnboardingSteps from '../onboarding-steps'
import { Lock } from 'lucide-react'
import PlanForm from './plan-form'

type Props = {}

export default function PlanPage({ }: Props) {
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