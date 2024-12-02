'use client'

import { useEffect } from 'react'

export default function TestPage() {
    useEffect(() => {
        // Function to load script dynamically
        const loadScript = () => {
            const checkoutId = "chk_e9kcej6q782zitdpcvk1yn2k" // You can get this from props or state
            const script = document.createElement('script')
            script.src = `${process.env.NEXT_PUBLIC_ROOT_URL}/api/checkout?checkoutId=${checkoutId}`
            script.async = true
            document.body.appendChild(script)
        }

        loadScript()

        // Cleanup function
        return () => {
            const checkoutId = "chk_e9kcej6q782zitdpcvk1yn2k" // Make sure to use the same ID
            const script = document.querySelector(
                `script[src="${process.env.NEXT_PUBLIC_ROOT_URL}/api/checkout?checkoutId=${checkoutId}"]`
            )
            if (script) {
                document.body.removeChild(script)
            }
        }
    }, []) // Add checkoutId to dependencies if it comes from props/state

    return (
        <div>
            <h1>Test Page</h1>
            {/* Script will be injected by useEffect */}
        </div>
    )
}