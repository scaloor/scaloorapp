import React from 'react'

type FunnelEditPageProps = {
    params: {
        funnelId: string
    }
}

export default function FunnelEditPage({ params }: FunnelEditPageProps) {
    const { funnelId } = params
  return (
    <div>FunnelEditPage</div>
  )
}