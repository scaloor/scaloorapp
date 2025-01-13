import { LucideIcon } from 'lucide-react'
import React from 'react'

type OnboardingStepsProps = {
    step: number
    message: string
    Icon: LucideIcon

}

export default function OnboardingSteps({ step, message, Icon }: OnboardingStepsProps) {
    return (
        <div className='flex justify-center py-5'>
            <div className='flex flex-col justify-center items-center gap-4'>
                {Icon && <Icon className='h-12 w-12 text-primary justify-center' />}
                <h1 className='text-4xl font-bold text-center'>
                    {message}
                </h1>
                <p>
                    Step {step}/3
                </p>
            </div>
        </div>
    )
}