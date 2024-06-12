'use client'
import { Dispatch, createContext, useContext, useReducer } from "react";
import { EditorAction } from "./editor-actions";
import { EditorProps, StageEditorState } from "./editor-types";
import { Stage } from "@/server/db/types";

const initialStageEditorState: StageEditorState = {
    device: 'Desktop',
    previewMode: false,
};
/**
 * 
 * @param state 
 * @param action 
 * @returns 
 */
const editorReducer = (
    state: StageEditorState = initialStageEditorState,
    action: EditorAction
): StageEditorState => {
    switch (action.type) {
        case "CHANGE_DEVICE":
            const changedDeviceState = {
                ...state,
                device: action.payload.device,
            }
            return changedDeviceState;

        case "TOGGLE_PREVIEW_MODE":

            const togglePreviewModeState = {
                ...state,
                previewMode: !state.previewMode,
            }
            return togglePreviewModeState;

        default:
            return state
    }
};

export const EditorContext = createContext<{
    state: StageEditorState
    dispatch: Dispatch<EditorAction>
    businessId: number
    funnelId: number
    pageDetails: Stage | null
}>({
    state: initialStageEditorState,
    dispatch: () => undefined,
    businessId: 0,
    funnelId: 0,
    pageDetails: null
});

/**
 * A small provider for the StageEditor to provide global state for device sizes and preview mode.
 * @param EditorProps 
 * @returns EditorContextProvider
 */
const StageEditorProvider = (props: EditorProps) => {
    const [state, dispatch] = useReducer(editorReducer, initialStageEditorState);
    const { businessId, funnelId, pageDetails, children } = props;
    return (
        <EditorContext.Provider
            value={{
                state,
                dispatch,
                businessId,
                funnelId,
                pageDetails
            }}>
            {children}
        </EditorContext.Provider>
    )
}

/**
 * A small provider for the StageEditor to provide global state for device sizes and preview mode.
 * @returns 
 */
export const useStageEditor = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useStageEditor Hook must be wrapped in StageEditorProvider');
    }
    return context
}

export default StageEditorProvider;
