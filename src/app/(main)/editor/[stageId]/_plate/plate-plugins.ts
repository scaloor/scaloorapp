import { ParagraphElement } from "@/app/_components/plate-ui/paragraph-element";
import { createPlugins } from "@udecode/plate-common";
import { ELEMENT_PARAGRAPH, createParagraphPlugin } from "@udecode/plate-paragraph";
import { createDndPlugin } from '@udecode/plate-dnd';
import { createNodeIdPlugin } from '@udecode/plate-node-id';
import { withDraggables } from "@/app/_components/plate-ui/with-draggables";


export const plugins = createPlugins(
    [
        createParagraphPlugin(),
        createNodeIdPlugin(),
        createDndPlugin({ options: { enableScroller: true } }),

    ], {
    components: withDraggables({
        [ELEMENT_PARAGRAPH]: ParagraphElement,
    })
})