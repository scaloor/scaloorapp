

import { Button } from '@/app/_components/ui/button'
import { DialogHeader, DialogFooter } from '@/app/_components/ui/dialog'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/app/_components/ui/dialog'
import { deleteDomainAction } from '@/server/actions/api/domain'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

type DeleteDialogProps = {
    domainId: string
}

export default function DeleteDialog({ domainId }: DeleteDialogProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition();

    const handleDeleteDomain = async (domainId: string) => {
        startTransition(async () => {
            const { error } = await deleteDomainAction(domainId)
            if (error) {
                toast.error(error)
            }
        })
        toast.success('Domain deleted successfully')
        router.refresh()
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" size="sm" className="h-8">
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete this domain?</DialogTitle>
                    <DialogDescription>This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="destructive"
                        onClick={() => handleDeleteDomain(domainId)}
                        disabled={isPending}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}