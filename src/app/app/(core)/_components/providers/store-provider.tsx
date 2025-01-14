'use client'

import { useAppStore } from '../stores/app-store'

export function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    const { isLoading, error } = useAppStore()

    if (error) {
        console.error('Failed to load user data:', error)
    }

    return <>{children}</>
}