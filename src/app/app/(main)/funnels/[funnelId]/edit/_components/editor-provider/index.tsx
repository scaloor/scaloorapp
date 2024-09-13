'use client'
import React, { ReactNode, createContext, useContext, useReducer } from 'react'
import { SelectPage } from '@/server/db/schema'

// Might want to add published
// Might want to add funnelId

type Styles = {
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    buttonColor: string;
    buttonTextColor: string;
    accentColor: string;
}

type DeviceTypes = 'Desktop' | 'Mobile' | 'Tablet'

interface FunnelEditorState {
    funnelId: string; // Add this line
    pages: SelectPage[];
    styles: Styles;
    deviceType: DeviceTypes;
    previewMode: boolean;
}

type FunnelEditorAction =
    | { type: 'ADD_PAGE'; page: SelectPage }
    | { type: 'REMOVE_PAGE'; pageId: string }
    | { type: 'UPDATE_STYLES'; styles: Partial<Styles> }
    | { type: 'SET_DEVICE_TYPE'; deviceType: DeviceTypes }
    | { type: 'TOGGLE_PREVIEW_MODE' }

function funnelEditorReducer(state: FunnelEditorState, action: FunnelEditorAction): FunnelEditorState {
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

const FunnelEditorContext = createContext<{
    state: FunnelEditorState;
    dispatch: React.Dispatch<FunnelEditorAction>;
} | undefined>(undefined)

export function FunnelEditorProvider({ children, initialPages, funnelId }: { children: ReactNode, initialPages: SelectPage[], funnelId: string }) {
    const [state, dispatch] = useReducer(funnelEditorReducer, {
        pages: initialPages,
        funnelId,
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
        <FunnelEditorContext.Provider value={{ state, dispatch }}>
            {children}
        </FunnelEditorContext.Provider>
    )
}

export function useFunnelEditor() {
    const context = useContext(FunnelEditorContext)
    if (!context) {
        throw new Error('useFunnelEditor must be used within a FunnelEditorProvider')
    }
    return context
}
