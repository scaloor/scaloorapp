'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/_components/ui/card';
import { Button } from '@/app/_components/ui/button';
import { Badge } from '@/app/_components/ui/badge';
import { formatDate } from '@/lib/utils';
import { z } from 'zod';
import DeleteDialog from './delete-dialog';
import EditScaloorDialog from './edit-dialog';

interface DomainCardProps {
    domainId: string;
    domain: string;
    //status: 'Active' | 'Inactive';
    lastUpdated: string;
}

const EditScaloorDialogSchema = z.object({
    domainName: z.string().min(2, { message: 'Domain name must be at least 2 characters.' }).max(30, { message: 'Domain name must be at most 30 characters.' }),
});

export function DomainCard({ domainId, domain, lastUpdated }: DomainCardProps) {
    const subdomain = domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '');

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <CardTitle className="text-xl font-bold">
                            {domain}
                        </CardTitle>
                        <div>
                            <Badge variant="affirmative">Live</Badge>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {domain.includes('scaloor') && (
                            <EditScaloorDialog
                                domainId={domainId}
                                domainName={subdomain}
                            />
                        )}
                        <DeleteDialog domainId={domainId} />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Last updated: {formatDate(lastUpdated)}</p>

            </CardContent>
        </Card>
    );
}
