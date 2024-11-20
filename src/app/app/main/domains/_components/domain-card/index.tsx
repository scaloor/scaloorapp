'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/_components/ui/card';
import { Button } from '@/app/_components/ui/button';
import { Badge } from '@/app/_components/ui/badge';
import { formatDate } from '@/lib/utils';
import { z } from 'zod';
import DeleteDialog from './delete-dialog';
import EditScaloorDialog from './edit-dialog';
import { getDomainConfigAction } from '@/server/actions/protected/domain';
import DomainConfig from './domain-config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface DomainCardProps {
    domainId: string;
    domain: string;
    configured: boolean;
    lastUpdated: string;
}

export type DomainConfig = {
    name: string;
    apex: string;
    verified: boolean;
    configured: boolean;
}

export function DomainCard({ domainId, domain, configured, lastUpdated }: DomainCardProps) {
    const subdomain = domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '');
    const [domainConfig, setDomainConfig] = useState<DomainConfig | null>(null)
    const router = useRouter()


    //Temp
    const testDomainConfig = async (domainId: string) => {
        const domainConfigResponse = await getDomainConfigAction(domainId)
        setDomainConfig(domainConfigResponse as DomainConfig)
        if (domainConfigResponse == null) {
            router.refresh()
            toast.success('Domain is live')
        } else {
            toast('Configure the domain with your DNS provider')
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <CardTitle className="text-xl font-bold">
                            {domain}
                        </CardTitle>
                        <div>
                            {configured ? (
                                <Badge variant="affirmative">Live</Badge>
                            ) : (
                                <Badge variant="destructive">Not Configured</Badge>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {domain.includes('scaloor') && (
                            <EditScaloorDialog
                                domainId={domainId}
                                domainName={subdomain}
                            />
                        )}
                        {!domain.includes('scaloor') && !configured && ( //If !Live
                            <Button variant="outline" size="sm" onClick={() => testDomainConfig(domainId)}>
                                Check Configuration
                            </Button>
                        )}
                        <DeleteDialog domainId={domainId} />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Last updated: {formatDate(lastUpdated)}</p>
                {domainConfig && !domainConfig.configured && (
                    <DomainConfig domainConfig={domainConfig} />
                )}

            </CardContent>
        </Card>
    );
}
