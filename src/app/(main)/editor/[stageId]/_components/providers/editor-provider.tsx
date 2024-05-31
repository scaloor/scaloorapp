'use client'
import { Dispatch, createContext, useContext, useReducer } from "react";
import { EditorAction, addBlock, deleteBlock, updateBlock } from "./editor-actions";
import { EditorProps, EditorState, HistoryState } from "./editor-types";
import { Stage } from "@/server/db/types";


const initialEditorState: EditorState['editor'] = {
    liveMode: false,
    blocks: [],
    selectedBlock: null,
    device: 'Desktop',
    previewMode: false,
    stageId: 0,
};

const initialHistoryState: HistoryState = {
    history: [initialEditorState],
    currentIndex: 0,
};

const initialState: EditorState = {
    editor: initialEditorState,
    history: initialHistoryState,
};

const editorReducer = (
    state: EditorState = initialState,
    action: EditorAction
): EditorState => {
    switch (action.type) {
        case "ADD_BLOCK":
            const updatedEditorStateAfterAdd = {
                ...state.editor,
                blocks: addBlock(state.editor.blocks, action),
            }
            const updatedHistoryAfterAdd = [
                ...state.history.history.slice(0, state.history.currentIndex + 1),
                { ...updatedEditorStateAfterAdd }, // Save the updated editor state
            ]

            const newEditorStateAfterAdd = {
                ...state,
                editor: updatedEditorStateAfterAdd,
                history: {
                    ...state.history,
                    history: updatedHistoryAfterAdd,
                    currentIndex: updatedHistoryAfterAdd.length - 1,
                },
            }

            return newEditorStateAfterAdd;

        case "UPDATE_BLOCK":
            const updatedBlockIsSelected = state.editor.selectedBlock?.id === action.payload.blockDetails.id

            const updatedEditorStateAfterUpdate = {
                ...state.editor,
                blocks: updateBlock(state.editor.blocks, action),
                selectedBlock: updatedBlockIsSelected ? action.payload.blockDetails : null,
            }

            const updatedHistoryAfterUpdate = [
                ...state.history.history.slice(0, state.history.currentIndex + 1),
                { ...updatedEditorStateAfterUpdate },
            ]

            const newEditorStateAfterUpdate = {
                ...state,
                editor: updatedEditorStateAfterUpdate,
                history: {
                    ...state.history,
                    history: updatedHistoryAfterUpdate,
                    currentIndex: updatedHistoryAfterUpdate.length - 1,
                },
            }

            return newEditorStateAfterUpdate;

        case "DELETE_BLOCK":
            const updatedEditorStateAfterDelete = {
                ...state.editor,
                blocks: deleteBlock(state.editor.blocks, action),
            }
            const updatedHistoryAfterDelete = [
                ...state.history.history.slice(0, state.history.currentIndex + 1),
                { ...updatedEditorStateAfterDelete }, // Save the updated editor state
            ]

            const newEditorStateAfterDelete = {
                ...state,
                editor: updatedEditorStateAfterDelete,
                history: {
                    ...state.history,
                    history: updatedHistoryAfterDelete,
                    currentIndex: updatedHistoryAfterDelete.length - 1,
                },
            }

            return newEditorStateAfterDelete;

        case "CHANGE_SELECTED_BLOCK":
            const selectedState = {
                ...state,
                editor: {
                    ...state.editor,
                    selectedBlock: action.payload.blockDetails || null,
                },
                history: {
                    ...state.history,
                    history: [
                        ...state.history.history.slice(0, state.history.currentIndex + 1),
                        { ...state.editor }
                    ],
                    currentIndex: state.history.currentIndex + 1,
                },
            };
            return selectedState;

        case "CHANGE_DEVICE":
            const changedDeviceState = {
                ...state,
                editor: {
                    ...state.editor,
                    device: action.payload.device,
                },
            }
            return changedDeviceState;

        case "TOGGLE_PREVIEW_MODE":

            const previewModeState = !!state.editor.previewMode
            console.log('previewModeState:', previewModeState)

            const togglePreviewModeState = {
                ...state,
                editor: {
                    ...state.editor,
                    previewMode: !state.editor.previewMode,
                },
            }
            return togglePreviewModeState;

        case "TOGGLE_LIVE_MODE":
            const toggleLiveModeState = {
                ...state,
                editor: {
                    ...state.editor,
                    previewMode: action.payload
                        ? action.payload.value
                        : !state.editor.liveMode,
                },
            }
            return toggleLiveModeState;

        case "UNDO":
            if (state.history.currentIndex > 0) {
                const undoIndex = state.history.currentIndex - 1
                const undoEditorState = { ...state.history.history[undoIndex] }
                const undoState = {
                    ...state,
                    editor: undoEditorState,
                    history: {
                        ...state.history,
                        currentIndex: undoIndex,
                    },
                }
                return undoState
            }
            return state

        case "REDO":
            if (state.history.currentIndex < state.history.history.length - 1) {
                const redoIndex = state.history.currentIndex + 1
                const redoEditorState = { ...state.history.history[redoIndex] }
                const redoState = {
                    ...state,
                    editor: redoEditorState,
                    history: {
                        ...state.history,
                        currentIndex: redoIndex,
                    },
                }
                return redoState
            }
            return state

        case "LOAD_DATA":
            return {
                ...initialState,
                editor: {
                    ...initialState.editor,
                    blocks: action.payload.blocks || initialEditorState.blocks,
                    liveMode: !!action.payload.withLive,
                },
            }

        case "SET_STAGE_ID":
            const stageId = action.payload.stageId
            const updatedEditorStateWithStageId = {
                ...state.editor,
                stageId,
            }

            const updatedHistoryWithStageId = [
                ...state.history.history.slice(0, state.history.currentIndex + 1),
                { ...updatedEditorStateWithStageId },
            ]

            const stageEditorState = {
                ...state,
                editor: updatedEditorStateWithStageId,
                history: {
                    history: updatedHistoryWithStageId,
                    currentIndex: updatedHistoryWithStageId.length - 1,
                },
            }
            return stageEditorState;

        default:
            return state
    }
};

export const EditorContext = createContext<{
    state: EditorState
    dispatch: Dispatch<EditorAction>
    businessId: number
    funnelId: number
    pageDetails: Stage | null
}>({
    state: initialState,
    dispatch: () => undefined,
    businessId: 0,
    funnelId: 0,
    pageDetails: null
});

/**
 * 
 * @param EditorProps 
 * @returns EditorContextProvider
 */
const EditorProvider = (props: EditorProps) => {
    const [state, dispatch] = useReducer(editorReducer, initialState);
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

export const useEditor = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useEditor Hook must be wrapped in EditorProvider');
    }
    return context
}

export default EditorProvider;
