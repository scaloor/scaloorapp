import { Stage } from "@/server/db/types";

/**
 * Different views for funnel stages
 */
export type DeviceTypes = 'Desktop' | 'Laptop' | 'Mobile';


/**
 * Stage Editor
 */
export type StageEditorState = {
    device: DeviceTypes;
    previewMode: boolean;
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