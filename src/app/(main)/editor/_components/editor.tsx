'use client';

import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { Button } from "@/app/_components/ui/button";

import { testData } from "@/server/actions/editor/index";
import { OutputData } from "@editorjs/editorjs";
import ImageBlock from "../_tools/image-block/tool";
import StylesSidebar from "./navigation/styles-sidebar";
import StructureSidebar from "./navigation/structure-sidebar";




export default function Editor() {
    const [isMounted, setIsMounted] = useState(false);
    const [data, setData] = useState<string[] | null>(null);
    const ref = useRef<EditorJS>();
    const [toolsVisible, setToolsVisible] = useState(false);


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
            });
            ref.current = editor;
        }
    }

    useEffect(() => {
        if (typeof window != 'undefined') {
            setIsMounted(true);
        }
    }, [])

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

    const save = () => {
        if (!!ref.current) {
            ref.current.save().then((outputData: OutputData) => {
                console.log("Article data: ", outputData);
                console.log("Type of Article data: ", typeof outputData);
                /* alert(JSON.stringify(outputData)); */
                testData(outputData);
            })
        }
    };

    const handleTextSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.toString()) {
            setToolsVisible(true);
        } else {
            setToolsVisible(false);
        }
    };

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



    return (
        <div className="">
            <StructureSidebar />
            <StylesSidebar
                tools={[
                    <button key="bold" onClick={() => applyTool('bold')}>Bold</button>,
                    <button key="italic" onClick={() => applyTool('italic')}>Italic</button>,
                    <button key="underline" onClick={() => applyTool('underline')}>Underline</button>,
                ]}
                visible={toolsVisible}
            />
            <div className="mt-10">
                <div id="editorjs" className="text-black"></div>
                <Button onClick={save} className="">
                    Save
                </Button>
            </div>
        </div>
    )
}