'use client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/_components/ui/tooltip'
import React, { FocusEventHandler } from 'react'
import { useStageEditor } from '../providers/editor-provider';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeftCircle, EyeIcon } from 'lucide-react';
import { Input } from '@/app/_components/ui/input';
import { Stage } from '@/server/db/types';
import { updateStage } from '@/server/data/stage';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger } from '@/app/_components/ui/tabs';
import { DeviceTypes } from '../providers/editor-types';
import { DesktopIcon, LaptopIcon, MobileIcon, PlayIcon } from '@radix-ui/react-icons';
import { Button } from '@/app/_components/ui/button';

type EditorNavigationProps = {
    stageDetails: Stage
}

export default function EditorNavigation({ stageDetails }: EditorNavigationProps) {
    const { state, dispatch } = useStageEditor();

    // This function is used to update the stage name
    const handleOnBlurTitleChange: FocusEventHandler<HTMLInputElement> = async (
        event
    ) => {
        if (event.target.value === stageDetails.name) return
        if (event.target.value) {
            const newStageDetails = {
                ...stageDetails,
                name: event.target.value,
            }
            await updateStage(newStageDetails)

            toast('Success', {
                description: 'Saved Funnel Page title',
            })

        } else {
            toast('Oops!', {
                description: 'You need to have a title!',
            })
            event.target.value = stageDetails.name
        }
    }

    // This function is used to toggle the preview mode
    const handlePreviewClick = () => {
        dispatch({ type: 'TOGGLE_PREVIEW_MODE' })
    }

    const handleOnSave = async () => {
        // TODO: Add logic to save stage content
        /* await saveStageContent(state.editor.stageId, state.editor.data);
        toast('Success', {
            description: 'Saved Stage Contents !',
        }) */
    }

    return (
        <TooltipProvider>
            <nav className={cn('border-b-[1px] grid grid-cols-3 transition-all bg-background overflow-hidden h-[50px]',
                { '!h-0 !p-0 !overflow-hidden': state.previewMode }
            )}>
                <aside className="flex justify-start items-center gap-4 max-w-[260px] w-[300px]">
                    <Link href={'/account/funnel'} className="">
                        <ArrowLeftCircle className="ml-4" />
                    </Link>
                    <div className="flex flex-col w-full ">
                        <Input
                            defaultValue={stageDetails.name}
                            className="border-none h-5 m-0 p-0 text-lg"
                            onBlur={handleOnBlurTitleChange}
                        />
                        <span className="text-sm text-muted-foreground">
                            Path: /{stageDetails.pathName}
                        </span>
                    </div>
                </aside>
                <aside className="flex justify-center">
                    <Tabs
                        defaultValue="Desktop"
                        className="flex w-fit justify-center"
                        value={state.device}
                        onValueChange={(value) => {
                            dispatch({
                                type: 'CHANGE_DEVICE',
                                payload: { device: value as DeviceTypes },
                            })
                        }}
                    >
                        <TabsList className="grid w-full grid-cols-3 bg-transparent h-fit">
                            <Tooltip>
                                <TooltipTrigger>
                                    <TabsTrigger
                                        value="Desktop"
                                        className="data-[state=active]:bg-muted w-10 h-10 p-0"
                                    >
                                        <DesktopIcon />
                                    </TabsTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Desktop</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <TabsTrigger
                                        value="Laptop"
                                        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                                    >
                                        <LaptopIcon />
                                    </TabsTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Laptop</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <TabsTrigger
                                        value="Mobile"
                                        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                                    >
                                        <MobileIcon />
                                    </TabsTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Mobile</p>
                                </TooltipContent>
                            </Tooltip>
                        </TabsList>
                    </Tabs>
                </aside>
                <aside className="flex justify-end items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger>
                            <Button
                                variant={'ghost'}
                                size={'icon'}
                                className="hover:bg-slate-800"
                                onClick={handlePreviewClick}
                            >
                                <PlayIcon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Preview stage</p>
                        </TooltipContent>
                    </Tooltip>

                    <Button onClick={handleOnSave}>Save</Button>
                    {/* <div className="flex flex-col item-center mr-4">
                        <span className="text-muted-foreground text-sm">
                            Last updated {formattedUpdatedAt}
                        </span>
                    </div> */}
                </aside>
            </nav>
            {!!state.previewMode && (
                <Button
                    variant={'outline'}
                    className='fixed bottom-6 left-1/2 transform -translate-x-1/2 rounded-3xl bg-transparent border-primary text-primary'
                    onClick={handlePreviewClick}>
                    Exit Preview mode
                </Button>
            )}
        </TooltipProvider>
    )
}