'use client'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { SelectCheckout } from '@/server/db/schema/checkout'



type CheckoutContextType = {
    // State
    checkout: SelectCheckout
    // General update
    updateCheckout: (updates: Partial<SelectCheckout>) => void
    // Customer field toggles
    toggleCustomerName: () => void
    toggleCustomerEmail: () => void
    toggleCustomerPhone: () => void
    toggleCustomerAddress: () => void
    // Product detail updates
    updateName: (name: string) => void
    updateDescription: (description: string | null) => void
    updatePrice: (price: number) => void
    updateThumbnail: (thumbnail: string | null) => void
    updateProductFile: (file: string) => void
}



const CheckoutContext = createContext<CheckoutContextType | null>(null)



export function useCheckout() {
    const checkoutStore = useContext(CheckoutContext)
    if (!checkoutStore) {
        throw new Error('useCheckout must be used within a CheckoutProvider')
    }
    return checkoutStore

}



interface CheckoutProviderProps {
    initialCheckout: SelectCheckout
    children: ReactNode
}



export function CheckoutProvider({ initialCheckout, children }: CheckoutProviderProps) {
    const [checkout, setCheckout] = useState<SelectCheckout>(initialCheckout)

    const updateCheckout = useCallback((updates: Partial<SelectCheckout>) => {
        setCheckout(prev => ({ ...prev, ...updates }))
    }, [])

    const toggleCustomerName = useCallback(() => {
        setCheckout(prev => ({ ...prev, customerName: !prev.customerName }))
    }, [])

    const toggleCustomerEmail = useCallback(() => {
        setCheckout(prev => ({ ...prev, customerEmail: !prev.customerEmail }))
    }, [])

    const toggleCustomerPhone = useCallback(() => {
        setCheckout(prev => ({ ...prev, customerPhone: !prev.customerPhone }))
    }, [])



    const toggleCustomerAddress = useCallback(() => {
        setCheckout(prev => ({ ...prev, customerAddress: !prev.customerAddress }))
    }, [])

    const updateName = useCallback((name: string) => {
        setCheckout(prev => ({ ...prev, productName: name }))
    }, [])

    const updateDescription = useCallback((description: string | null) => {
        setCheckout(prev => ({ ...prev, productDescription: description }))
    }, [])

    const updatePrice = useCallback((price: number) => {
        setCheckout(prev => ({ ...prev, productPrice: price }))
    }, [])

    const updateThumbnail = useCallback((thumbnail: string | null) => {
        setCheckout(prev => ({ ...prev, thumbnail }))
    }, [])



    const updateProductFile = useCallback((file: string) => {
        setCheckout(prev => ({ ...prev, productFile: file }))
    }, [])



    const value = {
        checkout,
        updateCheckout,
        toggleCustomerName,
        toggleCustomerEmail,
        toggleCustomerPhone,
        toggleCustomerAddress,
        updateName,
        updateDescription,
        updatePrice,
        updateThumbnail,
        updateProductFile,
    }



    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    )

}


