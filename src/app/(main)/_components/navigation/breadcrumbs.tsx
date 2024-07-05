'use client';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/app/_components/ui/breadcrumb"
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
    const pathname = usePathname()
    const pages = pathname.split('/').splice(0, 2)
    console.log(pages)
    let pageUrl = '/'
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pages.map((page) => {
                    pageUrl += page + '/';
                    let capitalizedPage = page.charAt(0).toUpperCase() + page.slice(1);
                    if (pages[pages.length - 1] === page) {
                        return (
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={pageUrl}>{capitalizedPage}</BreadcrumbLink>
                                </BreadcrumbItem>
                            </>
                        )
                    } else {
                        return (
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={pageUrl}>{capitalizedPage}</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </>
                        )
                    }

                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}