'use client';

import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { Button } from "@/app/_components/ui/button";

import edjsHTML from "editorjs-html";
import parse from "html-react-parser";
import HTMLPreview from "./html-preview";
import { testData } from "@/server/actions/editor/index";
import { OutputData } from "@editorjs/editorjs";




export default function Editor() {
    const [isMounted, setIsMounted] = useState(false);
    const [data, setData] = useState<string[] | null>(null);
    const ref = useRef<EditorJS>();

    const edjsParser = edjsHTML();


    const initializeEditor = async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        /* const Table = (await import("@editorjs/table")).default; */

        if (!ref.current) {
            const editor = new EditorJS({
                holder: 'editorjs',
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: true
                      },
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


                const html = edjsParser.parse(outputData);
                console.log('HTML: ', html)
                setData(html)
            })
        }
    };



    return (
        <div>
            <Button onClick={save} className="">
                Save
            </Button>
            <div id="editorjs" className="max-w-full min-h-screen text-black" />
            {/* {!data &&
                <>
                    <Button onClick={save} className="">
                        Save
                    </Button>
                    <div id="editorjs" className="max-w-full min-h-screen text-black" />
                </>
            }
            {!!data &&
                <div className="text-black">
                    <Button onClick={() => {
                        setData(null)
                        setIsMounted(true)
                    }} className="">
                        Edit
                    </Button>
                    <HTMLPreview html={data} />
                </div>
            } */}
        </div >
    )
}