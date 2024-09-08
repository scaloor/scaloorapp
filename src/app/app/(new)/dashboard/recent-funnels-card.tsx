'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { SelectFunnel } from '@/server/db/schema'
import React from 'react'
import { DataTable } from '@/app/_components/ui/data-table'
import { funnelColumns } from '@/app/app/(business)/funnel/[funnelId]/_components/columns';
import FunnelList from '../funnels/funnel-list'
import { Separator } from '@/app/_components/ui/separator'

type RecentFunnelsCardProps = {
  funnels: SelectFunnel[]
}

export default function RecentFunnelsCard({ funnels }: RecentFunnelsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Funnels</CardTitle>
      </CardHeader>
      <div className="w-full h-px bg-gray-200 mb-4"></div>
      <CardContent>
        <FunnelList />
      </CardContent>
    </Card>
  )
}