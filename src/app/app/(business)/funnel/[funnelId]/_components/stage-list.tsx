"use client"

import { useEffect, useState, useTransition } from 'react';
import { createSwapy } from 'swapy';
import StageItem from './stage-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card';
import { Button } from '@/app/_components/ui/button';
import SelectedStageImage from './selected-stage-image';
import EditStage from './edit-stage';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { updateStageColumns } from '@/server/data/stage';
import { SwapEventArray } from '@/lib/types';

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
}

export default function StageList({ stages }: StageListProps) {
    // Use this if you want to add local storage
    /* const defaultSlotItems = stages.reduce((acc, stage, index) => {
        acc[stage.id] = ALPHABET[index];
        return acc;
    }, {} as Record<string, string>); */
    /* const slotItems = const slotItems: Record<string, 'a' | 'b' | 'c' | 'd' | null> = localStorage.getItem('slotItem')
    ? JSON.parse(localStorage.getItem('slotItem')!)
    : defaultSlotItems; */
    const router = useRouter();
    const [selectedStage, setSelectedStage] = useState<StageListDetails>(stages[0]);
    const [stageOrder, setStageOrder] = useState<SwapEventArray>([]);
    const [isPending, startTransition] = useTransition();

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
                selected={selectedStage.id == id}
                setSelectedStage={() => { setSelectedStage(stages.find(stage => stage.id === id)!); }}
            />
        );
        return components;
    }, {} as Record<string, () => React.JSX.Element>);

    useEffect(() => {
        const container = document.querySelector('.container')!;
        const swapy = createSwapy(container);
        swapy.onSwap(({ data }) => {
            // TODO: Save the stage order to local storage
            // localStorage.setItem('slotItem', JSON.stringify(data.object));
            console.log("Data:", data.array)
            setStageOrder(data.array);
        });
    }, []);

    const handleSaveStageOrder = async () => {
        console.log("Stage Order:", stageOrder);
        if (stageOrder.length === 0) {
            toast('No changes made to stage order');
            return;
        }

        startTransition(async () => {
            try {
                // Use Promise.all to wait for all updates to complete
                await Promise.all(stageOrder.map(async (stage) => {
                    if (!stage.item) {
                        throw new Error('Invalid stage item');
                    }
                    const { dbStage, error } = await updateStageColumns({
                        id: stage.item,
                        order: parseInt(stage.slot)
                    });
                    if (error) {
                        throw new Error('Error updating stage order');
                    }
                }));
                setStageOrder([]);
                toast('Stage order saved');
            } catch (error) {
                console.error('Error saving stage order:', error);
                toast('Error updating stage order');
            }
        });
    };

    return (
        <div className='flex w-full mt-4 justify-between xl:flex-row flex-col gap-4'>
            {/* Stage List */}
            <div className=" gap-2 !px-0 !mx-0 max-w-lg container">
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
                        <Button
                            className='my-4'
                            disabled={isPending}
                            onClick={handleSaveStageOrder}>
                            Save Stage Order
                        </Button>
                    </CardContent>
                </Card>
            </div>
            {/* Stage Details */}
            <Card className='flex-1 py-4'>
                <CardContent>
                    <div className='flex flex-col'>
                        <div className='flex lg:flex-row flex-col justify-between gap-4'>
                            <EditStage
                                key={selectedStage.id}
                                id={selectedStage.id}
                                name={selectedStage.name}
                                pathName={selectedStage.pathName} />
                            <div>
                                <SelectedStageImage
                                    id={selectedStage.id}
                                    name={selectedStage.name}
                                    previewImage={selectedStage.previewImage}
                                />
                            </div>
                        </div>
                    </div>

                </CardContent>

            </Card>
        </div>
    );
}
