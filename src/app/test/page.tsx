'use client'

import { useEffect } from 'react'

export default function TestPage() {
    useEffect(() => {
        const loadScript = () => {
            const script = document.createElement('script')
            script.src = 'http://localhost:3000/api/checkout?checkoutId=chk_a8aaosw7fd6xpa9iimitwdy0'
            script.async = true
            document.body.appendChild(script)
        }

        loadScript()

        return () => {
            const script = document.querySelector(
                `script[src="http://localhost:3000/api/checkout?checkoutId=chk_a8aaosw7fd6xpa9iimitwdy0"]`
            )
            if (script) {
                document.body.removeChild(script)
            }
        }
    }, [])

    return (
        <div>
            <div id="checkout-container" />
        </div>
    )
}