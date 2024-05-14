'use client';

import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { Button } from "@/app/_components/ui/button";




export default function Editor() {
    const [isMounted, setIsMounted] = useState(false);
    const ref = useRef<EditorJS>();

    const initializeEditor = async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        /* const Table = (await import("@editorjs/table")).default; */

        if (!ref.current) {
            const editor = new EditorJS({
                holder: 'editorjs',
                tools: {
                    header: Header,
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
            ref.current.save().then((outputData) => {
                console.log("Article data: ", outputData);
                alert(JSON.stringify(outputData));
            })
        }
    };



    return (
        <div>
            <div id="editorjs" className="max-w-full min-h-screen text-black" />
            <Button onClick={save}>
                Save
            </Button>
        </div>
    )
}