import { Loading } from '@/app/_components/common/loading'
import React from 'react'

export default function EditFunnelLoading() {
    return (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <Loading />
        </div>
    )
}