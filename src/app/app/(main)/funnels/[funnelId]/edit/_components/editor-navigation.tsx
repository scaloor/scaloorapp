'use client'

import { Button } from '@/app/_components/ui/button'
import React from 'react'
import { useFunnelEditor } from './editor-provider'
import { saveFunnelAction } from '@/server/actions/protected/editor'
import { toast } from 'sonner'
import PublishDialog from './publish-dialog'
import Link from 'next/link'

export default function EditorNavigation() {
    const { state } = useFunnelEditor()

    const handleSaveFunnel = async () => {
        const jsonPages = JSON.stringify(state.pages)

        const { success, error } = await saveFunnelAction({
            funnelId: state.funnelId,
            pages: jsonPages,
            checkoutProduct: state.checkoutProduct
        })
        if (error) {
            toast.error(error)
        }
        if (success) {
            toast.success('Funnel saved')
        }
    }

    return (
        <header className="fixed top-0 right-0 z-50">
            <div className="flex items-center h-14 mr-4 gap-2">
                <Button variant="outline" className="h-8" onClick={handleSaveFunnel}>
                    Save
                </Button>
                <Link href={`/funnels/${state.funnelId}/preview`} target="_blank">
                    <Button variant="outline" className="h-8">
                        Preview
                    </Button>
                </Link>
                <PublishDialog />
            </div>
        </header>
    )
}