'use client';
import { Tabs, TabsContent } from '@/app/_components/ui/tabs'
import React from 'react'
import RightTabList from './right-tab-list'

type Props = {}

export default function RightSidebar({ }: Props) {
    return (
        <Tabs className='flex flex-row-reverse'
            defaultValue="Styles"
        >
            <div className='w-[50px] border-l h-screen'>
                {/* Tabs */}
                <RightTabList />
            </div>
            <div className='flex flex-row w-full'>
                {/* Tab Contents */}
                <TabsContent value="Styles">
                    Styles
                </TabsContent>
                <TabsContent value="Media">
                    Media
                </TabsContent>
            </div>
        </Tabs>
    )
}