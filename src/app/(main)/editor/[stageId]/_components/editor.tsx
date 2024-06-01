'use client';

import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { Button } from "@/app/_components/ui/button";
import { saveStageContent, testData } from "@/server/actions/editor/index";
import { OutputData } from "@editorjs/editorjs";
import ImageBlock from "../_tools/image-block/tool";
import StylesSidebar from "./navigation/style/styles-sidebar";
import StructureSidebar from "./navigation/structure/structure-sidebar";
import { useEditor } from "./providers/editor-provider";
import { cn } from "@/lib/utils";




export default function Editor() {
    const { state, dispatch } = useEditor();
    const [isMounted, setIsMounted] = useState(false);
    const [data, setData] = useState<string[] | null>(null);
    const ref = useRef<EditorJS>();
    const [toolsVisible, setToolsVisible] = useState(false);

    // Initialize the editor
    const initializeEditor = async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        /* const Table = (await import("@editorjs/table")).default; */

        if (!ref.current) {
            const editor = new EditorJS({
                holder: 'editorjs',
                placeholder: 'Start building your funnel',
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: true
                    },
                    imageBlock: {
                        class: ImageBlock,
                        inlineToolbar: false,
                    },
                },
                onReady: () => {
                    console.log('EditorJS loaded')
                    const editorElement = document.getElementById('editorjs');
                    if (editorElement) {
                        editorElement.addEventListener('mouseup', handleTextSelection);
                        editorElement.addEventListener('keyup', handleTextSelection);
                    }
                },
                onChange: handleChange,
            });
            ref.current = editor;
        }
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
    const handleChange = async () => {
        if (ref.current) {
            try {
                const savedData = await ref.current.save();
                console.log('Saved data: ', savedData);
                if (savedData.blocks.length > 0) {
                    console.log('Blocks: ', savedData.blocks);
                    dispatch({ type: "UPDATE_BLOCK", payload: { blockDetails: savedData.blocks[0] } });
                }
            } catch (error) {
                console.error('Saving failed: ', error);
            }
        }
    };

    // Save the editor data
    const save = async () => {
        // Access the editor instance directly
        if (!!ref.current) {
            ref.current.save().then((outputData: OutputData) => {
                console.log("Article data: ", outputData);
                console.log("Type of Article data: ", typeof outputData);
                /* alert(JSON.stringify(outputData)); */
                testData(outputData);
            })
            const savedData = await ref.current.save();
            console.log('Save SavedData:', savedData.blocks);
            saveStageContent(state.editor.stageId, savedData.blocks);
        }
        // Save from the editorContext state
        console.log('Editor state:', state.editor);
        

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



    return (
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
            <StructureSidebar />
            <StylesSidebar
                tools={[
                    <button key="bold" onClick={() => applyTool('bold')}>Bold</button>,
                    <button key="italic" onClick={() => applyTool('italic')}>Italic</button>,
                    <button key="underline" onClick={() => applyTool('underline')}>Underline</button>,
                ]}
                visible={toolsVisible}
            />
            <div className="">
                <div id="editorjs" className="text-black"></div>
            </div>
            <Button onClick={save} className="">
                Save
            </Button>
        </div>
    )
}