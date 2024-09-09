'use client';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/app/_components/ui/breadcrumb"
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Suspense, useEffect, useState } from "react";
import { getFunnelByIdAction } from "@/server/actions/funnel";

export default function Breadcrumbs() {
    const pathname = usePathname()
    const pathSegments = pathname.split('/').filter(segment => segment !== '')
    const [processedSegments, setProcessedSegments] = useState<string[]>([]);

    useEffect(() => {
        const fetchFunnelNames = async () => {
            const updatedSegments = await Promise.all(pathSegments.map(async (segment) => {
                if (segment.startsWith('fun_')) {
                    try {
                        // Replace this with your actual API call to fetch funnel name
                        const { dbFunnel } = await getFunnelByIdAction(segment)
                        console.log(dbFunnel?.name)
                        return dbFunnel?.name || segment
                    } catch (error) {
                        console.error('Error fetching funnel name:', error);
                        return segment;
                    }
                }
                return segment;
            }));
            setProcessedSegments(updatedSegments);
        };

        fetchFunnelNames();
    }, [pathname]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="font-semibold text-lg">
                        <BreadcrumbLink href="/">
                            <Image src="/assets/logo.png" alt="Scaloor" width={16} height={16} />
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {processedSegments.map((segment, index) => (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="font-semibold text-sm">
                                {index === pathSegments.length - 1 ? (
                                    segment.charAt(0).toUpperCase() + segment.slice(1)
                                ) : (
                                    <BreadcrumbLink href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
                                        {segment.charAt(0).toUpperCase() + segment.slice(1)}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </>
                    ))}
                </BreadcrumbList>
            </Breadcrumb >
        </Suspense>
    )
}