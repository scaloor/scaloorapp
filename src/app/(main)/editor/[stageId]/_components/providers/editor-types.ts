import { Stage } from "@/server/db/types";

/**
 * Different views for funnel stages
 */
export type DeviceTypes = 'Desktop' | 'Tablet' | 'Mobile';

/**
 * Block component
 */
export type BlockComponent = {
    id: string;
    type: string;
    data: object;
};

/**
 * Type of block component
 */
export type BlockTypes = 'paragraph' | 'header' | 'imageBlock'

/**
 * Stage Editor
 */
export type Editor = {
    liveMode: boolean;
    blocks: BlockComponent[];
    selectedBlock: BlockComponent | null;
    device: DeviceTypes;
    previewMode: boolean;
    stageId: number | null;
}

/**
 * 
 */
export type HistoryState = {
    history: Editor[];
    currentIndex: number;
}

/**
 * 
 */
export type EditorState = {
    editor: Editor;
    history: HistoryState;
}

export type EditorContextData = {
    device: DeviceTypes
    previewMode: boolean
    setPreviewMode: (previewMode: boolean) => void
    setDevice: (device: DeviceTypes) => void
}

export type EditorProps = {
    children: React.ReactNode
    businessId: number
    funnelId: number
    pageDetails: Stage
}