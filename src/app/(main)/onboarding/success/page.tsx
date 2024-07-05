import React from 'react'
import OnboardingSteps from '../onboarding-steps'
import { CircleCheck } from 'lucide-react'
import { Button } from '@/app/_components/ui/button'
import Link from 'next/link'

type Props = {}

export default function SuccessPage({ }: Props) {
    return (
        <div className='w-full flex flex-col justify-center items-center mt-20 gap-4'>
            <OnboardingSteps
                step={3}
                message='Your account is setup!'
                Icon={CircleCheck}
            />
            <p>
                You can now start scaling !
            </p>
            <Link href={'/account/settings'}>
                <Button className='mt-4 bg-primary p-4 text-white' >
                    Go to account
                </Button>
            </Link>
        </div>
    )
}