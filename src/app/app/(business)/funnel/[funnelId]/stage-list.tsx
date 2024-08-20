'use client';
import { AlertDialog } from '@/app/_components/ui/alert-dialog'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { Stage } from '@/server/db/types'
import { Check, ExternalLink, FilterIcon, HandCoins, LucideEdit, ShoppingBag } from 'lucide-react'
import React, { useState } from 'react'
import {
    DragDropContext,
    DragStart,
    DropResult,
    Droppable,
} from 'react-beautiful-dnd'
import StageStepCard from './stage-step-card'
import { updateStage } from '@/server/data/stage';
import { toast } from 'sonner';
import CreateStageDialog from './create-stage-dialog';
import { Card, CardDescription, CardHeader, CardTitle } from '@/app/_components/ui/card';
import Link from 'next/link';
import Placeholder from './placeholder';



type StageListProps = {
    stages: Stage[]
}

export default function StageList({ stages }: StageListProps) {
    const [selectedStage, setSelectedStage] = useState<Stage | null>(stages[0]);
    const [pagesState, setPagesState] = useState(stages);

    const onDragStart = (event: DragStart) => {
        const { draggableId } = event
        const value = pagesState.find((page) => page.id!.toString() === draggableId)
    }

    const onDragEnd = (dropResult: DropResult) => {
        const { destination, source } = dropResult

        //no destination or same position
        if (
            !destination ||
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)
        ) {
            return
        }
        //change state
        const newPageOrder = [...pagesState]
            .toSpliced(source.index, 1)
            .toSpliced(destination.index, 0, pagesState[source.index])
            .map((page, idx) => {
                return { ...page, order: idx }
            })

        setPagesState(newPageOrder)
        newPageOrder.forEach(async (stage, index) => {
            try {
                const newStage = {
                    ...stage,
                    order: index,
                }
                await updateStage(newStage);
            } catch (error) {
                console.log(error) // This should be handled better
                toast('Failed', {
                    description: 'Could not save stage order',
                })
                return
            }
        })

        toast('Success', {
            description: 'Saved stage order',
        })
    }

    return (

        <div className='flex border-[1px] rounded-lg flex-col p-6'>
            <aside className='flex flex-col gap-4'>
                <ScrollArea className='h-full'>
                    <div className='flex gap-4 items-center'>
                        <ShoppingBag />
                        Funnel Stages
                    </div>
                    {pagesState.length ? (
                        <DragDropContext
                            onDragEnd={onDragEnd}
                            onDragStart={onDragStart}
                        >
                            <Droppable
                                droppableId="funnels"
                                direction="vertical"
                                key="funnels"
                            >
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {pagesState.map((stage, idx) => (
                                            <div
                                                className="relative"
                                                key={stage.id}
                                                onClick={() => setSelectedStage(stage)}
                                            >
                                                <StageStepCard
                                                    stage={stage}
                                                    index={idx}
                                                    key={stage.id}
                                                    activePage={stage.id === selectedStage?.id}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    ) : (
                        <div className="text-center text-muted-foreground py-6">
                            No Stages
                        </div>
                    )}
                </ScrollArea>
                <CreateStageDialog />
            </aside>
            <aside className='p-4'>
                {!!stages.length ? (
                    <Card className="h-full flex justify-between flex-col">
                        <CardHeader>
                            <p className="text-sm text-muted-foreground">Stage name</p>
                            <CardTitle>{selectedStage?.name}</CardTitle>
                            <CardDescription className="flex flex-col gap-4">
                                <div className="border-2 rounded-lg sm:w-80 w-full  overflow-clip">
                                    <Link
                                        href={`/editor/${selectedStage?.id}`}
                                        className="relative group"
                                    >
                                        <div className="cursor-pointer group-hover:opacity-30 w-full">
                                            <Placeholder />
                                        </div>
                                        <LucideEdit
                                            size={50}
                                            className="!text-muted-foreground absolute top-1/2 left-1/2 opacity-0 transofrm -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all duration-100"
                                        />
                                    </Link>

                                    <Link
                                        target="_blank"
                                        href={`/editor/${selectedStage?.id}`}
                                        className="group flex items-center justify-start p-2 gap-2 hover:text-primary transition-colors duration-200"
                                    >
                                        <ExternalLink size={15} />
                                        <div className="w-64 overflow-hidden overflow-ellipsis ">
                                            path
                                        </div>
                                    </Link>
                                </div>

                                {/* CreateFunnelPage */}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ) : (
                    <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                        Create a page to view page settings.
                    </div>
                )}
            </aside>
        </div>
    )
}