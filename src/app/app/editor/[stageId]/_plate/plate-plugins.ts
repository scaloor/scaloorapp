import { ParagraphElement } from "@/app/_components/plate-ui/paragraph-element";
import { PlateLeaf, RenderAfterEditable, createPlugins } from "@udecode/plate-common";
import { ELEMENT_PARAGRAPH, createParagraphPlugin } from "@udecode/plate-paragraph";
import { createDndPlugin } from '@udecode/plate-dnd';
import { createNodeIdPlugin } from '@udecode/plate-node-id';
import { withDraggables } from "@/app/_components/plate-ui/with-draggables";
import {
    createBoldPlugin,
    createCodePlugin,
    createItalicPlugin,
    createStrikethroughPlugin,
    createSubscriptPlugin,
    createSuperscriptPlugin,
    createUnderlinePlugin,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_SUBSCRIPT,
    MARK_SUPERSCRIPT,
    MARK_UNDERLINE,
} from '@udecode/plate-basic-marks';
import {
    createHeadingPlugin,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_H5,
    ELEMENT_H6,
    KEYS_HEADING,
} from '@udecode/plate-heading';
import {
    createFontBackgroundColorPlugin,
    createFontColorPlugin,
    createFontSizePlugin,
} from '@udecode/plate-font';
import {
    createHighlightPlugin,
    MARK_HIGHLIGHT,
} from '@udecode/plate-highlight';
import { createIndentPlugin } from '@udecode/plate-indent';
import { HeadingElement } from "@/app/_components/plate-ui/heading-element";
import { LinkFloatingToolbar } from "@/app/_components/plate-ui/link-floating-toolbar";
import { withProps } from "@udecode/cn";
import { createAlignPlugin } from '@udecode/plate-alignment';
import { createLinkPlugin, ELEMENT_LINK } from '@udecode/plate-link';
import { HighlightLeaf } from "@/app/_components/plate-ui/highlight-leaf";
import { createLineHeightPlugin } from '@udecode/plate-line-height';
import { createBlockSelectionPlugin } from "@udecode/plate-selection";

type pluginStyles = {
    h1Styles?: string;
    h2Styles?: string;
    h3Styles?: string;
}

export function getCreatePlugins({
    h1Styles,
    h2Styles,
    h3Styles,
}: pluginStyles = {}) {

    const plugins = createPlugins(
        [
            // Nodes
            createParagraphPlugin(),
            createHeadingPlugin(),
            createLinkPlugin({
                renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
            }),

            // Marks
            createBoldPlugin(),
            createItalicPlugin(),
            createUnderlinePlugin(),
            createStrikethroughPlugin(),
            createCodePlugin(),
            createSubscriptPlugin(),
            createSuperscriptPlugin(),
            createFontColorPlugin(),
            createFontBackgroundColorPlugin(),
            createFontSizePlugin(),
            createHighlightPlugin(),

            // Block style
            createAlignPlugin({
                inject: {
                    props: {
                        validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3],
                    },
                },
            }),
            createIndentPlugin({
                inject: {
                    props: {
                        validTypes: [
                            ELEMENT_PARAGRAPH,
                            ELEMENT_H1,
                            ELEMENT_H2,
                            ELEMENT_H3,
                        ],
                    },
                },
            }),
            createLineHeightPlugin({
                inject: {
                    props: {
                        defaultNodeValue: 1.5,
                        validNodeValues: [1, 1.2, 1.5, 2, 3],
                        validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3],
                    },
                },
            }),

            // Functionality
            createBlockSelectionPlugin({
                options: {
                    sizes: {
                        top: 0,
                        bottom: 0,
                    },
                },
            }),
            createDndPlugin({ options: { enableScroller: true } }),
            createNodeIdPlugin(),

        ], {
        components: withDraggables({
            [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1', className: h1Styles ?? '' }),
            [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2', className: h2Styles ?? '' }),
            [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3', className: h3Styles ?? '' }),
            [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
            [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
            [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
            [ELEMENT_PARAGRAPH]: ParagraphElement,
            [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
            [MARK_HIGHLIGHT]: HighlightLeaf,
            [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
            [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
            [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
            [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
            [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
        })
    })

    return plugins;
}


