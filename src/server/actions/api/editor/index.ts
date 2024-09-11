'use server'

import { getFunnelById } from "@/server/data/funnels";
import { getPagesByFunnelId } from "@/server/data/page";
import { SelectPage } from "@/server/db/schema";

export async function loadEditorAction({ funnelId }: { funnelId: string }) {
    const { dbFunnel, error: funnelError } = await getFunnelById(funnelId);
    if (funnelError || !dbFunnel) {
        return {
            error: 'Funnel not found'
        }
    }
    // Get pages
    const { pages, error: pagesError } = await getPagesByFunnelId(funnelId);
    if (pagesError || !pages) {
        return {
            error: 'Pages not found'
        }
    }
    // If pages array is empty, create a default page
    /* if (pages?.length === 0) {
        return {
            message: 'No pages found',
            pages
        }
    } */

    // Else return the pages
    return {
        pages
    }
}

export async function addNewPageAction(page: SelectPage) {
    console.log('page', page)
    if (false) {
        return {
            error: 'Error adding new page'
        }
    }
}

