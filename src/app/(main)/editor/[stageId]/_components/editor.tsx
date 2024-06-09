'use client';

import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { Button } from "@/app/_components/ui/button";
import { saveStageContent, testData } from "@/server/actions/editor/index";
import { EditorData, Block } from "@editorjs/editorjs";
import StylesSidebar from "./navigation/style/styles-sidebar";
import StructureSidebar from "./navigation/structure/structure-sidebar";
import { useEditor } from "./providers/editor-provider";
import { cn } from "@/lib/utils";
import toolsObject from "../_tools";
import { Stage } from "@/server/db/types";
import { EDITORJS_VERSION } from "@/lib/constants/editorjs-constants";
import EditorNavigation from "./navigation/top-nav";


type EditorProps = {
    stageDetails: Stage
}

export default function Editor({ stageDetails }: EditorProps) {
    const { state, dispatch } = useEditor();
    const [isMounted, setIsMounted] = useState(false);
    const [data, setData] = useState<string[] | null>(null);
    const ref = useRef<EditorJS>();
    const [toolsVisible, setToolsVisible] = useState(false);

    // Default data for editor
    let initialData: EditorData = {
        time: new Date().getTime(),
        blocks: [],
        version: EDITORJS_VERSION,
    };

    // If stage content is available, use that as initial data
    if (!!stageDetails.content) {
        initialData = stageDetails.content as EditorData;
    }

    // Initialize the editor
    const initializeEditor = async () => {
        if (!ref.current) {
            const editor = new EditorJS({
                holder: 'editorjs',
                placeholder: 'Start building your funnel',
                tools: toolsObject,
                onReady: () => {
                    console.log('EditorJS loaded')
                    const editorElement = document.getElementById('editorjs');
                    if (editorElement) {
                        editorElement.addEventListener('mouseup', handleTextSelection);
                        editorElement.addEventListener('keyup', handleTextSelection);
                    }
                },
                onChange: handleChange,
                data: initialData,
            });
            ref.current = editor;
        }
        dispatch({ type: 'SET_STAGE_ID', payload: { stageId: stageDetails.id } })
    }

    // Use effect to check if the editor is mounted
    useEffect(() => {
        if (typeof window != 'undefined') {
            setIsMounted(true);
        }
    }, [])

    // Use effect to invoke the initializeEditor function when the component is mounted
    useEffect(() => {
        const init = async () => {
            await initializeEditor();
            dispatch({ type: 'LOAD_DATA', payload: { editorDetails: initialData, withLive: false } })
        };

        if (!!isMounted) {
            init();

            return () => {
                if (ref.current) {
                    ref.current.destroy();
                }
            }
        }
    }, [isMounted]);

    // Handle update block
    // If using autosave, this will be called on every change
    const handleChange = async () => {
        console.log('handleChange called');
        if (ref.current) {
            try {
                const savedData = await ref.current.save();
                if (savedData.blocks.length > 0) {
                    dispatch({ type: "UPDATE_DATA", payload: { editorDetails: savedData } });
                }
            } catch (error) {
                console.error('Failed to update data: ', error);
            }
        }
    };

    // Handle text selection
    const handleTextSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.toString()) {
            setToolsVisible(true);
        } else {
            setToolsVisible(false);
        }
    };

    // Show tools in toolbar
    const applyTool = (command: string) => {
        if (ref.current) {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                document.execCommand(command, false);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    };

    // This function requires onSelectionChange to be implemented in the editor
    /* const handleClick = () => {
        dispatch({
            type: 'CHANGE_SELECTED_BLOCK',
            payload: {},
        })
        console.log('selected block:', state.editor.selectedBlock)
    } */

    // UseEffect to render the editor
    /* useEffect(() => {
        if (!!ref.current && state.history.history[state.history.currentIndex]) {
          ref.current.render(state.history.history[state.history.currentIndex].data)
          .catch(console.error);
        }
      }, [state.history.currentIndex, state.history]); */

    const handleUndo = () => {
        dispatch({ type: 'UNDO' })

    }
    const handleRedo = () => {
        dispatch({ type: 'REDO' })
    }

    return (
        <>
            <EditorNavigation stageDetails={stageDetails} handleUndo={handleUndo} handleRedo={handleRedo} />
            <StructureSidebar />
            <StylesSidebar
                tools={[
                    <button key="bold" onClick={() => applyTool('bold')}>Bold</button>,
                    <button key="italic" onClick={() => applyTool('italic')}>Italic</button>,
                    <button key="underline" onClick={() => applyTool('underline')}>Underline</button>,
                ]}
                visible={toolsVisible}
            />
            <div className="container max-w-5xl">
                <div className={cn(
                    'border',
                    {
                        '!p-0 !mr-0':
                            state.editor.previewMode === true || state.editor.liveMode === true,
                        '!w-[850px]': state.editor.device === 'Tablet',
                        '!w-[420px]': state.editor.device === 'Mobile',
                        'w-full': state.editor.device === 'Desktop',
                    }
                )}
            /* onClick={handleClick} */>
                    <div className="">
                        <div id="editorjs" className="text-black"></div>
                    </div>
                </div>
            </div>
        </>
    )
}