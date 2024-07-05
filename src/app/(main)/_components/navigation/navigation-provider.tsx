'use client'
import React, { ReactNode, createContext, useContext, useState } from 'react'

interface AccountNavigationState {
    isOpen: boolean;
    toggleOpen: () => void;
}

const AccountNavigationContext = createContext<AccountNavigationState | undefined>(undefined)

export function AccountNavigationProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(true)
    const toggleOpen = () => setIsOpen(!isOpen)
    return (
        <AccountNavigationContext.Provider value={{ isOpen, toggleOpen }}>
            {children}
        </AccountNavigationContext.Provider>
    )
}

export function useAccountNavigation() {
    const context = useContext(AccountNavigationContext)
    if (!context) {
        throw new Error('useAccountNavigation must be used within a AccountNavigationProvider')
    }
    return context
}