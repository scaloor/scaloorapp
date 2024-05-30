'use client'
import { Button } from '@/app/_components/ui/button'
import React from 'react'

type Props = {}

export default function ExitPreviewButton() {
    return (
        <div className='relative h-screen'>
            <div className='absolute bottom-4 left-1/2 transform '>
                <Button className='mt-[1/10]'>
                    Exit Preview mode
                </Button>
            </div>
        </div>
    )
}