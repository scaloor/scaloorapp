'use client'
import React, { ReactNode, createContext, useContext, useReducer } from 'react'
import { SelectPage } from '@/server/db/schema'
import { pageTypeEnum } from '@/server/db/schema'
import { JSONContent } from '@tiptap/react'

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

export type PageType = 'landing' | 'upsell' | 'downsell' | 'thank_you';

interface FunnelEditorState {
    funnelId: string;
    pages: SelectPage[];
    styles: Styles;
    deviceType: DeviceTypes;
    previewMode: boolean;
    published: boolean; // Need to add actions
    checkoutProduct: string | null; // Need to add actions
}

type FunnelEditorAction =
    | { type: 'ADD_PAGE'; page: SelectPage }
    | { type: 'REMOVE_PAGE'; pageId: string }
    | { type: 'ON_PAGE_CHANGE'; pageId: string; content: JSONContent }
    | { type: 'UPDATE_PAGE_TYPE'; pageId: string; pageType: PageType }
    | { type: 'UPDATE_STYLES'; styles: Partial<Styles> }
    | { type: 'SET_DEVICE_TYPE'; deviceType: DeviceTypes }
    | { type: 'TOGGLE_PREVIEW_MODE' }
    | { type: 'SET_PUBLISHED'; published: boolean }
    | { type: 'SET_CHECKOUT_PRODUCT'; productId: string }


function funnelEditorReducer(state: FunnelEditorState, action: FunnelEditorAction): FunnelEditorState {
    switch (action.type) {
        case 'ADD_PAGE':
            return { ...state, pages: [...state.pages, action.page] };
        case 'REMOVE_PAGE':
            const updatedPages = state.pages.filter(page => page.id !== action.pageId);
            return {
                ...state,
                pages: updatedPages.map((page, index) => ({
                    ...page,
                    order: index + 1
                }))
            };
        case 'ON_PAGE_CHANGE':
            return {
                ...state,
                pages: state.pages.map(page =>
                    page.id === action.pageId
                        ? { ...page, content: action.content }
                        : page
                )
            };
        case 'UPDATE_PAGE_TYPE':
            return {
                ...state,
                pages: state.pages.map(page =>
                    page.id === action.pageId
                        ? { ...page, type: action.pageType as PageType }
                        : page
                )
            };
        case 'UPDATE_STYLES':
            return { ...state, styles: { ...state.styles, ...action.styles } };
        case 'SET_DEVICE_TYPE':
            return { ...state, deviceType: action.deviceType };
        case 'TOGGLE_PREVIEW_MODE':
            return { ...state, previewMode: !state.previewMode };
        case 'SET_PUBLISHED':
            return { ...state, published: action.published };
        case 'SET_CHECKOUT_PRODUCT':
            console.log('SET_CHECKOUT_PRODUCT', action.productId)
            return { ...state, checkoutProduct: action.productId };
        default:
            return state;
    }
}

const FunnelEditorContext = createContext<{
    state: FunnelEditorState;
    dispatch: React.Dispatch<FunnelEditorAction>;
} | undefined>(undefined)

export function FunnelEditorProvider({ children, initialPages, funnelId, checkoutProduct }: { children: ReactNode, initialPages: SelectPage[], funnelId: string, checkoutProduct: string }) {
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
        published: false,
        checkoutProduct: checkoutProduct,
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
