'use client'

import { Product, sampleProducts } from '@/app/app/(main)/products/_components/sample-products'
import React, { useState } from 'react'
import SelectProductComponent from './select-product'
import CheckoutComponent from './checkout-component'


export default function CheckoutNode() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

  if (!selectedProduct) return (
    <SelectProductComponent
      selectedProductId={selectedProductId}
      setSelectedProduct={setSelectedProduct}
      setSelectedProductId={setSelectedProductId}
    />
  )

  return (
    <CheckoutComponent />
  )
}