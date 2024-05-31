'use client'
import { Button } from '@/app/_components/ui/button'
import React from 'react'

type Props = {}

export default function ExitPreviewButton() {
    return (
        <Button variant={'outline'} className='fixed bottom-6 left-1/2 transform -translate-x-1/2 rounded-3xl bg-transparent border-primary text-primary'>
            Exit Preview mode
        </Button>
    )
}