'use client';
import React from 'react'
import { useStageEditor } from './providers/editor-provider';
import EditorNavigation from './navigation/editor-navigation';
import { Stage } from '@/server/db/types';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/app/_components/ui/resizable';
import { cn } from '@/lib/utils';
import LeftSidebar from './navigation/left-sidebar';
import RightSidebar from './navigation/right-sidebar';
import PlateEditor from './plate-editor';
import { PlateController } from '@udecode/plate-common';

type StageEditorProps = {
    stage: Stage
}

export default function StageEditor({ stage }: StageEditorProps) {
    const { state, dispatch } = useStageEditor(); // Might not need this
    const defaultLayout = [265, 440];
    return (
        <PlateController>
            <div className='no-scrollbar'>
                {/* Top Nav */}
                <EditorNavigation
                    stageDetails={stage} />
                <ResizablePanelGroup
                    direction='horizontal'
                    className='h-screen items-stretch'>
                    <ResizablePanel
                        defaultSize={defaultLayout[0]}
                        minSize={15}
                        maxSize={20}
                        className={cn('h-screen', !!state.previewMode && 'hidden')}
                    >
                        {/* Structure Sidebar */}
                        <LeftSidebar />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel>
                        {/* Editor */}
                        <PlateEditor />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel
                        defaultSize={defaultLayout[0]}
                        minSize={15}
                        maxSize={20}
                        className={cn('h-screen', !!state.previewMode && 'hidden')}
                    >
                        {/* Styles Sidebar */}
                        <RightSidebar />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div >
        </PlateController>
    )
}