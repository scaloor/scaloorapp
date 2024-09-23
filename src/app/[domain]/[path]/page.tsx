import React from 'react'

type CustomPageProps = {
  params: {
    domain: string
    path: string
  }
}

export default function CustomPage({ params }: CustomPageProps) {
    console.log(params)
    console.log(decodeURIComponent(params.path))
    // Get the funnel page using the params

    // Check that the funnel is published
  return (
    <div>CustomPage</div>
  )
}