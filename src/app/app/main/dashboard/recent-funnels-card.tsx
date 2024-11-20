'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { SelectFunnel } from '@/server/db/schema'
import React from 'react'
import FunnelList from '../funnels/_components/funnel-list'

type RecentFunnelsCardProps = {
  funnels: SelectFunnel[]
}

export default function RecentFunnelsCard({ funnels }: RecentFunnelsCardProps) {
  return (
    <Card className='p-0'>
      <CardHeader>
        <CardTitle>Recent Funnels</CardTitle>
        <div className="w-full h-px bg-gray-200 mb-4"></div>
      </CardHeader>
      <CardContent>
        <FunnelList funnels={funnels} />
      </CardContent>
    </Card>
  )
}