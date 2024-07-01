import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'

type ErrorPageProps = {
    errorMessage: string
}

export default function ErrorPage({ errorMessage }: ErrorPageProps) {
    return (
        <div className='flex justify-center items-center align-middle flex-col h-screen w-full'>
            <Card className='border border-red-500'>
                <CardHeader className="text-5xl text-red-500 font-semibold">Error !</CardHeader>
                <CardContent className='mt-4 dark:text-white text-black'>{errorMessage}</CardContent>
            </Card>
        </div>
    )
}