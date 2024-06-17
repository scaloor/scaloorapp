'use client';
import React from 'react'
import { Plate, Value } from '@udecode/plate-common';
import { Editor } from '@/app/_components/plate-ui/editor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import { getCreatePlugins } from '../_plate/plate-plugins';
import { TooltipProvider } from '@/app/_components/plate-ui/tooltip';
import { FloatingToolbar } from '@/app/_components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/app/_components/plate-ui/floating-toolbar-buttons';
import { serverData } from '@/server/actions/stage';



export default function PlateEditor() {

    const handleOnChange = (data: Value) => {
        // console.log('Data:', data);
        serverData(data);
    }

    const plugins = getCreatePlugins({
        h1Styles: 'text-blue-400 italic'
    });

    return (
        <div className='bg-white h-screen text-black p-5'>
            <TooltipProvider>
                <DndProvider backend={HTML5Backend}>
                    <Plate
                        onChange={handleOnChange}
                        plugins={plugins}
                    >
                        <Editor
                            variant='outline'
                            focusRing={false}
                            className='bg-white py-5'
                            placeholder='Start building your funnel'
                        />
                        <FloatingToolbar className='rounded-md bg-background shadow-lg border-2'>
                            <FloatingToolbarButtons />
                        </FloatingToolbar>
                    </Plate>
                </DndProvider>
            </TooltipProvider>
        </div>
    )
}