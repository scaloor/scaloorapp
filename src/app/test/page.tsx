'use client'

import { useEffect } from 'react'

export default function TestPage() {
    useEffect(() => {
        // Function to load script dynamically
        const loadScript = () => {
            const script = document.createElement('script')
            script.src = `${process.env.NEXT_PUBLIC_ROOT_URL}/api/checkout`
            script.async = true
            document.body.appendChild(script)
        }

        loadScript()

        // Cleanup function to remove script when component unmounts
        return () => {
            const script = document.querySelector(`script[src="${process.env.NEXT_PUBLIC_ROOT_URL}/api/checkout"]`)
            if (script) {
                document.body.removeChild(script)
            }
        }
    }, []) // Empty dependency array means this runs once on mount

    return (
        <div>
            <h1>Test Page</h1>
            {/* Script will be injected by useEffect */}
        </div>
    )
}