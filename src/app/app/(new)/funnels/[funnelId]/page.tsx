import React from 'react'

type FunnelViewPageProps = {
    params: {
        funnelId: string
    }
}

export default function FunnelViewPage({ params }: FunnelViewPageProps) {
    const { funnelId } = params
  return (
    <div>FunnelViewPage</div>
  )
}