import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { SelectFunnel } from '@/server/db/schema'
import React from 'react'
import FunnelTable from '@/app/app/(business)/funnel/funnel-table'
import { columns } from "@/app/app/(business)/funnel/funnel-table/columns";

type RecentFunnelsCardProps = {
  funnels: SelectFunnel[]
}

export default function RecentFunnelsCard({ funnels }: RecentFunnelsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Funnels</CardTitle>
      </CardHeader>
      <CardContent>
        {funnels.length > 0 ? (
          <FunnelTable columns={columns} data={funnels} />
        ) : (
          <p>No funnels found</p>
        )}
      </CardContent>
    </Card>
  )
}