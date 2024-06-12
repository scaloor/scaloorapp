import { DeviceTypes } from "./editor-types"

export type EditorAction =
    | {
        type: 'CHANGE_DEVICE'
        payload: {
            device: DeviceTypes
        }
    }
    | {
        type: 'TOGGLE_PREVIEW_MODE'
    };