import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'

type ErrorPageProps = {
    errorMessage: string
}

export default function ErrorPage({ errorMessage }: ErrorPageProps) {
    return (
        <div className='flex justify-center items-center align-middle flex-col h-full w-full'>
            <h1 className='text-5xl text-red-500 font-semibold'>Error !</h1>
            <p className='text-xl text-gray-500'>{errorMessage}</p>
            <Link href="/dashboard">
                <Button variant="outline" className='mt-4'>
                    Go back
                </Button>
            </Link>
        </div>
    )
}