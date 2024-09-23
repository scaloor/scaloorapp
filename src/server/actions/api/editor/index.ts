'use server'

import { PageType } from "@/app/app/(main)/funnels/[funnelId]/edit/_components/editor-provider";
import { getFunnelById, updateFunnelColumns } from "@/server/data/funnels";
import { addPage, deletePageById, getPageById, getPagesByFunnelId, updatePage } from "@/server/data/page";
import { SelectPage } from "@/server/db/schema";
import { JSONContent } from "@tiptap/react";

export async function loadEditorAction({ funnelId }: { funnelId: string }) {
    const { dbFunnel, error: funnelError } = await getFunnelById(funnelId);
    if (funnelError || !dbFunnel) {
        return { error: 'Funnel not found' }
    }
    // Get pages
    const { pages, error: pagesError } = await getPagesByFunnelId(funnelId);
    if (pagesError || !pages) {
        return {
            error: 'Pages not found'
        }
    }

    return { pages, checkoutProduct: dbFunnel.checkoutProduct }
}

export async function saveFunnelAction({
    funnelId,
    pages,
    checkoutProduct,
}: {
    funnelId: string;
    pages: string;
    checkoutProduct: string | null;
}) {
    try {
        // Convert the pages string from JSON to SelectPage[]
        const parsedPages: SelectPage[] = JSON.parse(pages);
        if (!Array.isArray(parsedPages)) {
            return { error: 'Invalid pages data' };
        }
        // First iterate through all the pages and save them
        for (const page of parsedPages) {
            const { dbPage } = await getPageById(page.id)
            if (!dbPage) {
                const { error: pageError } = await addPage(page);
                if (pageError) {
                    return { error: 'Error adding page' }
                }
            } else if (dbPage) {
                const { error: pageError } = await updatePage(page)
                if (pageError) {
                    return { error: 'Error updating pages' }
                }
            }
        }

        /**
         * Update the funnel table with checkout product and styles. 
         * TODO: Add styles.
         * Published should be handled separately.
         */
        // There is currently no authorization check on this function.
        // TODO: Evaluate authorization.
        const { error: funnelError } = await updateFunnelColumns({
            id: funnelId,
            checkoutProduct: checkoutProduct ?? undefined
        })
        if (funnelError) {
            return { error: 'Error updating funnel' }
        }

        return { success: true }
    } catch (error: any) {
        console.log('error', error)
        return {
            error: error.message
        }
    }
}

export async function deletePageAction(pageId: string) {
    try {
        const { error } = await deletePageById(pageId)
        if (error) {
            return { error: 'Error deleting page' }
        }
        return { success: true }
    } catch (error: any) {
        return { error: error.message }
    }
}

export async function onPageChangeAction(json: JSONContent) {
    console.log('json', json)
}

