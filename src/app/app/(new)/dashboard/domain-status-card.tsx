import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/_components/ui/card'
import React from 'react'

type DomainStatusCardProps = {
    customDomain?: string[];
    scaloorDomain?: string;
}

export default async function DomainStatusCard({ customDomain, scaloorDomain }: DomainStatusCardProps) {
    return (
        <Card className=''>
            <CardHeader>
                <CardTitle>Domain Status</CardTitle>
                <CardDescription>
                    Your current domain status
                </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <p>Custom Domain</p>
                    <p className='text-sm text-muted-foreground'>{customDomain ? customDomain : 'You haven\'t created your custom domain yet.'}</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>Scaloor Domain</p>
                    <p className='text-sm text-muted-foreground'>{scaloorDomain ? scaloorDomain : 'You haven\'t created your scaloor domain yet.'}</p>
                </div>
            </CardContent>
        </Card>
    )
}