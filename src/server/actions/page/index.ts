'use server'

import { getPageById } from "@/server/data/page"

// This is an example, could potentially be renamed depending on the use case
export async function getPageByIdAction(pageId: string) {
    try {
        const { dbPage } = await getPageById(pageId)
        return { dbPage }
    } catch (error: any) {
        return { error: error.message }
    }
}


