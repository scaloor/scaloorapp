import { Stage } from "@/server/db/types";
import { Block, EditorData } from "@editorjs/editorjs";

/**
 * Different views for funnel stages
 */
export type DeviceTypes = 'Desktop' | 'Tablet' | 'Mobile';

/**
 * Type of blocks
 */
export type BlockTypes = 'paragraph' | 'header' | 'imageBlock'

/**
 * Stage Editor
 */
export type Editor = {
    liveMode: boolean;
    data: EditorData;
    selectedBlock: Block | null;
    device: DeviceTypes;
    previewMode: boolean;
    stageId: number;
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