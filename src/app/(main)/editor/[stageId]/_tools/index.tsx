'use client'

import Header from "@editorjs/header"
import ImageBlock from "./image-block/tool"

const toolsObject = {
    header: {
        class: Header,
        inlineToolbar: true
    },
    imageBlock: {
        class: ImageBlock,
        inlineToolbar: false,
    },
}

export default toolsObject;