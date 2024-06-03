import { BlockComponent, DeviceTypes } from "./editor-types"

export type EditorAction =
    | {
        type: 'ADD_BLOCK'
        payload: {
            containerId: string
            blockDetails: BlockComponent
        }
    }
    | {
        type: 'UPDATE_BLOCK'
        payload: {
            blockDetails: BlockComponent[]
        }
    }
    | {
        type: 'DELETE_BLOCK'
        payload: {
            blockDetails: BlockComponent
        }
    }
    | {
        type: 'CHANGE_SELECTED_BLOCK'
        payload: {
            blockDetails?: BlockComponent | null
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
            blocks: BlockComponent[]
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
 * This function probably isn't required as editorJS handles adding and moving blocks
 * @param editorArray 
 * @param action 
 * @returns 
 */
export const addBlock = (
    editorArray: BlockComponent[],
    action: EditorAction
): BlockComponent[] => {
    if (action.type !== 'ADD_BLOCK') {
        throw Error('Wrong action type to the Add Block editor state')
    }
    // Add block logic
    return editorArray;

}

/**
 * 
 * @param editorArray 
 * @param action 
 * @returns 
 */
export const updateBlock = (
    editorArray: BlockComponent[],
    action: EditorAction
): BlockComponent[] => {
    if (action.type !== 'UPDATE_BLOCK') {
        throw Error('Wrong action type to the update Block editor state')
    }
    // Update block logic 
    return action.payload.blockDetails;
}

/**
 * This function probably isn't required as editorJS handles deleting blocks
 * @param editorArray 
 * @param action 
 * @returns 
 */
export const deleteBlock = (
    editorArray: BlockComponent[],
    action: EditorAction
): BlockComponent[] => {
    if (action.type !== 'DELETE_BLOCK') {
        throw Error('Wrong action type to the delete Block editor state')
    }
    // Delete block logic   
    return editorArray.filter(block => { block.id !== action.payload.blockDetails.id; })
}