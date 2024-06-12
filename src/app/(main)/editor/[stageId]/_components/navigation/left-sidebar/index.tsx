'use client';
import { Tabs, TabsContent } from '@/app/_components/ui/tabs'
import React from 'react'
import LeftTabList from './left-tab-list'

type Props = {}

export default function LeftSidebar({ }: Props) {
    return (
        <Tabs className='flex'
            defaultValue="Stages"
        >
            <div className='w-[50px] border-r h-screen'>
                {/* Tabs */}
                <LeftTabList />
            </div>
            <div className='w-full'>
                {/* Tab Contents */}
                <TabsContent value="Stages">
                    Stages
                </TabsContent>
                <TabsContent value="Templates">
                    Templates
                </TabsContent>
            </div>
        </Tabs>
    )
}