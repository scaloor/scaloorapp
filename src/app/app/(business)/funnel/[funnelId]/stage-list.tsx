"use client"

import { useEffect, useState } from 'react';
import { createSwapy } from 'swapy';
import StageItem from './_components/stage-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card';
import { Button } from '@/app/_components/ui/button';
import { ExternalLink, LucideEdit, StickyNote } from 'lucide-react';
import Placeholder from './_components/placeholder';
import Image from 'next/image';
import Link from 'next/link';

export type StageListDetails = {
    id: string;
    name: string;
    order: number;
    pathName: string;
    previewImage?: string;
    createdAt: string;
    updatedAt: string;
}

type StageListProps = {
    stages: StageListDetails[]
    funnelName: string;
}

export default function StageList({ stages, funnelName }: StageListProps) {
    // Use this if you want to add local storage
    /* const defaultSlotItems = stages.reduce((acc, stage, index) => {
        acc[stage.id] = ALPHABET[index];
        return acc;
    }, {} as Record<string, string>); */
    /* const slotItems = const slotItems: Record<string, 'a' | 'b' | 'c' | 'd' | null> = localStorage.getItem('slotItem')
    ? JSON.parse(localStorage.getItem('slotItem')!)
    : defaultSlotItems; */

    const [selectedStage, setSelectedStage] = useState<StageListDetails>(stages[0]);

    // Create a config for the items
    const itemsConfig = stages.map(stage => ({
        id: stage.id,
        label: stage.name
    }));

    // By reducing the itemsConfig, we create a new object with each component, this ensures that the components are both recreated and re-rendered
    // and fixes the type error: Cannot read properties of null (reading 'element')
    const ItemComponents = itemsConfig.reduce((components, { id, label }) => {
        components[id] = () => (
            <StageItem id={id}
                label={label}
                setSelectedStage={() => setSelectedStage(stages.find(stage => stage.id === id)!)}
            />
        );
        return components;
    }, {} as Record<string, () => React.JSX.Element>);

    useEffect(() => {
        const container = document.querySelector('.container')!;
        const swapy = createSwapy(container);
        swapy.onSwap(({ data }) => {
            localStorage.setItem('slotItem', JSON.stringify(data.object));
            console.log("slotItem", localStorage.getItem('slotItem'))
        });
    }, []);

    return (
        <div className='grid grid-cols-2 gap-4 mt-4'>
            {/* Stage List */}
            <div className="grid grid-cols-1 gap-2 !px-0 container">
                <Card>
                    <CardHeader>
                        <CardTitle>Stages:</CardTitle>
                    </CardHeader>
                    <CardContent className='grid grid-cols-1 gap-2 p-4'>
                        {stages.map((stage, index) => (
                            <div key={stage.id} className="bg-gray-800 rounded-[20px]" data-swapy-slot={`${index + 1}`}>
                                {ItemComponents[stage.id] ? ItemComponents[stage.id]() : null}
                            </div>
                        ))}
                        <Button className='my-4'>
                            Save Stage Order
                        </Button>
                    </CardContent>
                </Card>
            </div>
            {/* Stage Details */}
            <Card>
                <CardHeader>
                    <CardTitle>{selectedStage.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between'>
                            <div>
                                
                            </div>
                            <div className="border-2 rounded-lg sm:w-80 w-full  overflow-clip">
                                <Link
                                    href={`/editor/${selectedStage.id}`}
                                    className="relative group"
                                >
                                    <div className="cursor-pointer group-hover:opacity-30 w-full">
                                        {selectedStage.previewImage ? (
                                            <Image src={selectedStage.previewImage} alt={selectedStage.name} width={100} height={100} />
                                        ) : (
                                            <Placeholder />
                                        )}
                                    </div>
                                    <LucideEdit
                                        size={50}
                                        className="!text-muted-foreground absolute top-1/2 left-1/2 opacity-0 transofrm -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all duration-100"
                                    />
                                </Link>
                                <Link
                                    target="_blank"
                                    href={`preview link`}
                                    className="group flex items-center justify-start p-2 gap-2 hover:text-primary transition-colors duration-200"
                                >
                                    <ExternalLink size={15} />
                                    <div className="w-64 overflow-hidden overflow-ellipsis ">
                                        Preview link
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                </CardContent>

            </Card>
        </div>
    );
}
