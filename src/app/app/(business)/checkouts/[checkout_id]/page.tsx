import React from 'react'

type CheckoutViewProps = {
    params: {
        checkout_id: string;
    }
}

export default function CheckoutView({ params }: CheckoutViewProps) {
    const { checkout_id } = params;
  return (
    <div>CheckoutView</div>
  )
}