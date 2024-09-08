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

export default function Breadcrumbs() {
    const pathname = usePathname()
    const pathSegments = pathname.split('/').filter(segment => segment !== '')
    console.log(pathSegments)

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="font-semibold text-lg">
                    <BreadcrumbLink href="/">
                        <Image src="/assets/logo.png" alt="Scaloor" width={16} height={16} />
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {pathSegments.map((segment, index) => (
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
    )
}