import React from 'react'
import CreateDeliveryForm from './create-delivery-form'

type Props = {}

export default function DeliveryPage({ }: Props) {
    return (
        <div className="p-4">
            <CreateDeliveryForm />
        </div>
    )
}