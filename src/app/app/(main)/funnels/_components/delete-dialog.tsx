'use client'
import React, { useState } from 'react'
import { Button } from '@/app/_components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/app/_components/ui/dialog'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'
import { deleteFunnelAction } from '@/server/actions/funnel'
import { useRouter } from 'next/navigation'

interface DeleteDialogProps {
    funnelId: string
    funnelName: string
}

export function DeleteDialog({ funnelId, funnelName }: DeleteDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const deleteFunnel = async () => {
        const { error } = await deleteFunnelAction(funnelId)
        if (error) {
            toast.error(error)
            return
        }
        toast('Funnel deleted', {
            description: funnelName
        })
        router.refresh()
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm text-red-500 dark:text-red-400 p-1"
                >
                    <Trash className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Delete funnel?</DialogTitle>
                <DialogDescription>This action cannot be undone.</DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="destructive" onClick={deleteFunnel}>Delete</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
