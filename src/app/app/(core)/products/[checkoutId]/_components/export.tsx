import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/_components/ui/tabs'
import { useCheckout } from './checkout-provider'

export default function CheckoutExport() {
  const [copied, setCopied] = useState(false)
  const checkoutStore = useCheckout()
  const checkoutId = checkoutStore.checkout?.id

  const reactSnippet = `// React Component Implementation
import { useEffect } from 'react'

export default function YourCheckoutComponent() {
  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script')
      script.src = '${process.env.NEXT_PUBLIC_ROOT_URL}/api/checkout?checkoutId=${checkoutId}'
      script.async = true
      document.body.appendChild(script)
    }

    loadScript()

    return () => {
      const script = document.querySelector(
        \`script[src="${process.env.NEXT_PUBLIC_ROOT_URL}/api/checkout?checkoutId=${checkoutId}"]\`
      )
      if (script) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return <div id="checkout-container" />
}`

  const htmlSnippet = `<div id="checkout-container"></div>
<script src="${process.env.NEXT_PUBLIC_ROOT_URL}/api/checkout?checkoutId=${checkoutId}" async></script>`

  const copyToClipboard = async (code: string) => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className='w-full h-[400px]'>
      <CardHeader>
        <CardTitle>Checkout Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="html" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="react">React</TabsTrigger>
          </TabsList>

          <TabsContent value="html">
            <div className="relative">
              <pre className="relative rounded-lg bg-slate-950 p-4 overflow-x-auto whitespace-pre-wrap break-words">
                <code className="text-white text-sm">{htmlSnippet}</code>
                <button
                  onClick={() => copyToClipboard(htmlSnippet)}
                  className={cn(
                    "absolute right-4 top-4 p-2 rounded-lg transition-all",
                    "hover:bg-slate-800",
                    "focus:outline-none focus:ring-2 focus:ring-slate-400"
                  )}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-slate-400" />
                  )}
                </button>
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="react">
            <div className="relative">
              <pre className="relative rounded-lg bg-slate-950 p-4 overflow-x-auto whitespace-pre-wrap break-words">
                <code className="text-white text-sm">{reactSnippet}</code>
                <button
                  onClick={() => copyToClipboard(reactSnippet)}
                  className={cn(
                    "absolute right-4 top-4 p-2 rounded-lg transition-all",
                    "hover:bg-slate-800",
                    "focus:outline-none focus:ring-2 focus:ring-slate-400"
                  )}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-slate-400" />
                  )}
                </button>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}