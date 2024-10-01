'use client'

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/app/_components/ui/card';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { updateFunnelNameAction } from '@/server/actions/funnel';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type FunnelNameCardProps = {
    funnelId: string;
    name: string;
}

export default function FunnelNameCard({ funnelId, name }: FunnelNameCardProps) {
    const [funnelName, setFunnelName] = useState(name);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()


    const handleUpsertFunnel = async () => {
        setIsLoading(true)
        const { success, error } = await updateFunnelNameAction(funnelId, funnelName)
        if (error) {
            toast.error(error)
        }
        if (success) {
            toast.success('Funnel name updated')
        }
        setIsLoading(false)
        router.refresh()
    }

    return (
        <Card>
            <CardHeader>
                <h3 className='text-lg font-medium'>Funnel Name</h3>
                <p className='text-sm text-muted-foreground'>Change the name of your funnel to update the URL path.</p>
            </CardHeader>
            <CardContent>
                <div className="max-w-md">
                    <Input
                        value={funnelName}
                        onChange={(e) => setFunnelName(e.target.value)}
                    />
                </div>
                <div className='flex justify-end'>
                    <Button onClick={handleUpsertFunnel} disabled={isLoading}>Save</Button>
                </div>
            </CardContent>
        </Card>
    )
}