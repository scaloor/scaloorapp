'use client'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/app/_components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/_components/ui/select'
import { useFunnelEditor } from './editor-provider'
import { toast } from 'sonner'
import { Button } from '@/app/_components/ui/button'
import { useEffect, useState } from 'react'
import { loadPublishDialogAction, publishFunnelAction } from '@/server/actions/api/editor'
import { SelectDomain } from '@/server/db/schema'



export default function PublishDialog() {
    const { state, dispatch } = useFunnelEditor()
    const [domains, setDomains] = useState<SelectDomain[]>([])
    const [selectedDomainId, setSelectedDomainId] = useState<string>('')
    const [previewUrl, setPreviewUrl] = useState<string>('')
    const [funnelPath, setFunnelPath] = useState<string>('')

    useEffect(() => {
        const fetchDomains = async () => {
            const { dbDomains, funnelPath, error } = await loadPublishDialogAction(state.funnelId);
            if (error) {
                toast.error('Failed to fetch domains');
                return;
            }
            if (dbDomains && funnelPath) {
                setDomains(dbDomains);
                setFunnelPath(funnelPath);
            }
        };

        fetchDomains();
    }, []);

    useEffect(() => {
        if (selectedDomainId) {
            const domain = domains.find(domain => domain.id === selectedDomainId)
            if (domain) {
                setPreviewUrl(`https://${domain.domain}/${funnelPath}`)
            }
        }
    }, [selectedDomainId])

    const handlePublish = async () => {
        const { success, error } = await publishFunnelAction({ funnelId: state.funnelId, published: true, domainId: selectedDomainId })
        if (error) {
            toast.error(error)
        }
        if (success) {
            dispatch({ type: 'SET_PUBLISHED', published: true })
            toast.success('Funnel published')
        }
    }

    const handleUnpublish = async () => {
        const { success, error } = await publishFunnelAction({ funnelId: state.funnelId, published: false, domainId: selectedDomainId })
        if (error) {
            toast.error(error)
        }
        if (success) {
            dispatch({ type: 'SET_PUBLISHED', published: false })
            toast.success('Funnel unpublished')
        }
    }

    if (state.published) {
        return (
            <Button variant="default" className="h-8" onClick={handleUnpublish}>
                Unpublish
            </Button>
        )
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="h-8">
                    Publish
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    Publish Funnel
                </DialogHeader>
                <DialogDescription>
                    Choose a domain to publish your funnel on.
                </DialogDescription>
                <Select
                    onValueChange={(value) => setSelectedDomainId(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Choose a domain" />
                    </SelectTrigger>
                    <SelectContent>
                        {domains.map((domain, index) => (
                            <SelectItem key={index} value={domain.id}>
                                {domain.domain}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {previewUrl && (
                    <div>
                        <p className='text-sm text-gray-500'>Once published, you can view your funnel at:</p>
                        <a
                            className='text-sm text-blue-500 hover:text-blue-600'
                            href={previewUrl}
                            target='_blank'>
                            {previewUrl}
                        </a>
                    </div>
                )}
                <div className='flex justify-end gap-2'>
                    <Button
                        onClick={() => handlePublish()}
                        disabled={state.published}
                    >
                        Publish
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}