import { Loading } from '@/app/_components/common/loading'
import React from 'react'


export default function LoadingPage() {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <Loading></Loading>
        </div>
    )
}