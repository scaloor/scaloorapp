import { Block, EditorData } from "@editorjs/editorjs"
import { DeviceTypes } from "./editor-types"

export type EditorAction =
    | {
        type: 'UPDATE_DATA'
        payload: {
            editorDetails: EditorData
        }
    }
    | {
        type: 'CHANGE_SELECTED_BLOCK'
        payload: {
            blockDetails?: Block | null
        }
    }
    | {
        type: 'CHANGE_DEVICE'
        payload: {
            device: DeviceTypes
        }
    }
    | {
        type: 'TOGGLE_PREVIEW_MODE'
    }
    | {
        type: 'TOGGLE_LIVE_MODE'
        payload?: {
            value: boolean
        }
    }
    | { type: 'REDO' }
    | { type: 'UNDO' }
    | {
        type: 'LOAD_DATA'
        payload: {
            editorDetails: EditorData
            withLive: boolean
        }
    }
    | {
        type: 'SET_STAGE_ID'
        payload: {
            stageId: number
        }
    }

/**
 * 
 * @param editorArray 
 * @param action 
 * @returns 
 */
export const updateData = (
    action: EditorAction
): EditorData => {
    if (action.type !== 'UPDATE_DATA') {
        throw Error('Wrong action type to the update Block editor state')
    }
    // Update block logic 
    return action.payload.editorDetails;
}