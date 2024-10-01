'use client'
import React, { ReactNode, createContext, useContext, useReducer } from 'react'

type Styles = {
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    buttonColor: string;
    buttonTextColor: string;
    accentColor: string;
}

interface PageState {
    funnelId: string;
    checkoutProduct: string | null;
    styles: Styles;
    paymentIntent: string | null;
    previewMode: boolean; 
}

type PageAction =
    | { type: 'SET_CHECKOUT_PRODUCT'; productId: string | null }
    | { type: 'UPDATE_STYLES'; styles: Partial<Styles> }
    | { type: 'SET_PAYMENT_INTENT'; paymentIntent: string | null }
    // No need for a SET_FUNNEL_ID action as it should not change after initialization

function pageReducer(state: PageState, action: PageAction): PageState {
    switch (action.type) {
        case 'SET_CHECKOUT_PRODUCT':
            return { ...state, checkoutProduct: action.productId };
        case 'UPDATE_STYLES':
            return { ...state, styles: { ...state.styles, ...action.styles } };
        case 'SET_PAYMENT_INTENT':
            return { ...state, paymentIntent: action.paymentIntent };
        default:
            return state;
    }
}

const PageContext = createContext<{
    state: PageState;
    dispatch: React.Dispatch<PageAction>;
} | undefined>(undefined)

export function PageProvider({ 
    children, 
    initialFunnelId,
    initialCheckoutProduct, 
    /* initialStyles, */ 
    initialPaymentIntent,
    previewMode
}: {
    children: ReactNode,
    initialFunnelId: string,
    initialCheckoutProduct: string,
    /* initialStyles: Styles, */
    initialPaymentIntent: string | null,
    previewMode: boolean
}) {
    const [state, dispatch] = useReducer(pageReducer, {
        funnelId: initialFunnelId,
        checkoutProduct: initialCheckoutProduct,
        styles: { //TODO: Change this to initialStyles
            backgroundColor: '#ffffff',
            textColor: '#000000',
            fontFamily: 'Inter',
            buttonColor: '#007bff',
            buttonTextColor: '#ffffff',
            accentColor: '#ff4500',
        },
        paymentIntent: initialPaymentIntent,
        previewMode: previewMode,
    });

    return (
        <PageContext.Provider value={{ state, dispatch }}>
            {children}
        </PageContext.Provider>
    )
}

export function usePage() {
    const context = useContext(PageContext)
    if (!context) {
        throw new Error('usePage must be used within a PageProvider')
    }
    return context
}
