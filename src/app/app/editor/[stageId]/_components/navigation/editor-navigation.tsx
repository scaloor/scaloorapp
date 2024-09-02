import React from "react";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/app/_components/ui/breadcrumb";
import { getStageById } from "@/server/data/stage";

type EditorNavigationProps = {
    children: React.ReactNode;
    funnelId: string;
    stageName: string;
}

export default async function EditorNavigation({ children, funnelId, stageName }: EditorNavigationProps) {
    return (
        <div className="flex flex-col">
            <nav className="bg-background shadow-sm">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="font-semibold text-lg">
                                    <BreadcrumbLink href={`/funnel/${funnelId}`}>
                                        Scaloor
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem className="font-semibold text-lg">
                                    {stageName}
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700">
                                Save
                            </Button >
                            <Button variant="ghost" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700">
                                Share
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="flex-grow">{children}</main>
        </div>
    );
}