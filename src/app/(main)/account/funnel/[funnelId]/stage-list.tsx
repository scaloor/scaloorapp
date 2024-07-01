'use client';
import { AlertDialog } from '@/app/_components/ui/alert-dialog'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { Stage } from '@/server/db/types'
import { Check } from 'lucide-react'
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
        <AlertDialog>
            <div className='flex border-[1px] rounded-lg flex-col p-6'>
                <ScrollArea className='h-full'>
                    <div className='flex gap-4 items-center'>
                        <Check />
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
            </div>
        </AlertDialog>
    )
}