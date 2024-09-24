'use client'

import SelectProductComponent from './select-product'
import CheckoutComponent from './checkout-component'
import { useFunnelEditor } from '../../../editor-provider'


export default function CheckoutNode() {
  const { state } = useFunnelEditor();

  if (!state.checkoutProduct) return (
    <SelectProductComponent />
  )

  return (
    <CheckoutComponent />
  )
}