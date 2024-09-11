'use client'
import React, { ReactNode, createContext, useContext, useReducer } from 'react'
import { SelectPage } from '@/server/db/schema'

// Might want to add published

type Styles = {
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    buttonColor: string;
    buttonTextColor: string;
    accentColor: string;
}

type DeviceTypes = 'Desktop' | 'Mobile' | 'Tablet'

interface EditorState {
    pages: SelectPage[];
    styles: Styles;
    deviceType: DeviceTypes;
    previewMode: boolean;
}

type EditorAction =
    | { type: 'ADD_PAGE'; page: SelectPage }
    | { type: 'REMOVE_PAGE'; pageId: string }
    | { type: 'UPDATE_STYLES'; styles: Partial<Styles> }
    | { type: 'SET_DEVICE_TYPE'; deviceType: DeviceTypes }
    | { type: 'TOGGLE_PREVIEW_MODE' }

function editorReducer(state: EditorState, action: EditorAction): EditorState {
    switch (action.type) {
        case 'ADD_PAGE':
            return { ...state, pages: [...state.pages, action.page] };
        case 'REMOVE_PAGE':
            return { ...state, pages: state.pages.filter(page => page.id !== action.pageId) };
        case 'UPDATE_STYLES':
            return { ...state, styles: { ...state.styles, ...action.styles } };
        case 'SET_DEVICE_TYPE':
            return { ...state, deviceType: action.deviceType };
        case 'TOGGLE_PREVIEW_MODE':
            return { ...state, previewMode: !state.previewMode };
        default:
            return state;
    }
}

const EditorContext = createContext<{
    state: EditorState;
    dispatch: React.Dispatch<EditorAction>;
} | undefined>(undefined)

export function EditorProvider({ children, initialPages }: { children: ReactNode, initialPages: SelectPage[] }) {
    const [state, dispatch] = useReducer(editorReducer, {
        pages: initialPages,
        styles: {
            backgroundColor: '#ffffff',
            textColor: '#000000',
            fontFamily: 'Inter',
            buttonColor: '#007bff',
            buttonTextColor: '#ffffff',
            accentColor: '#ff4500',
        },
        deviceType: 'Desktop',
        previewMode: false,
    });

    return (
        <EditorContext.Provider value={{ state, dispatch }}>
            {children}
        </EditorContext.Provider>
    )
}

export function useEditor() {
    const context = useContext(EditorContext)
    if (!context) {
        throw new Error('useEditor must be used within an EditorProvider')
    }
    return context
}
