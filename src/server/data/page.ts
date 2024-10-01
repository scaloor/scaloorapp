import 'server-only'
import { eq, asc, and } from "drizzle-orm";
import { db } from "../db";
import { page } from "../db/schema";
import { InsertPage, SelectPage } from "../db/schema";
import { canAccessPage } from '../authorization/page';

/**
 * Add new page
 */
export async function addPage(pageDetails: InsertPage) {
    try {
        if (!await canAccessPage(pageDetails.funnelId)) {
            return { error: 'You do not have access to add a page to this funnel' }
        }
        const insertPage = async (pageDetails: InsertPage) => {
            return await db.insert(page).values(pageDetails).returning().then(res => res[0])
        }
        const dbPage = await insertPage(pageDetails)

        return { dbPage }
    } catch (error: any) {
        console.log(error);
        return { error: error.message }
    }
}

/**
 * Update page
 */
export async function updatePage(pageDetails: InsertPage) {
    try {
        if (await canAccessPage(pageDetails.funnelId)) {
            const updatedPage = await db
                .update(page)
                .set({
                    ...pageDetails,
                    updatedAt: new Date().toISOString(),
                })
                .where(eq(page.id, pageDetails.id!))
                .returning().then(res => res[0]);
            return { dbPage: updatedPage };
        }
        return { error: 'You do not have access to update this page' };
    } catch (error: any) {
        console.log(error);
        return { error: error.message };
    }
}

/**
 * Update specific columns of a page
 */
type UpdatePageColumns = {
    id: string;
    name?: string;
    pathName?: string;
    order?: number;
    previewImage?: string;
    funnelId?: string;
};

export async function updatePageColumns(pageDetails: UpdatePageColumns) {
    try {
        const { dbPage } = await getPageById(pageDetails.id)
        if (!dbPage) {
            return { error: 'Page not found' };
        }
        if (await canAccessPage(dbPage.funnelId)) {
            const { id, ...updateData } = pageDetails;
            const updatedPage = await db
                .update(page)
                .set({
                    ...updateData,
                    updatedAt: new Date().toISOString(),
                })
                .where(eq(page.id, id))
                .returning()
                .then(res => res[0]);
            return { dbPage: updatedPage };
        }
        return { error: 'You do not have access to update this page' };
    } catch (error: any) {
        console.log(error);
        return { error: error.message };
    }
}

/**
 * Get page by id
 */
export async function getPageById(page_id: string) {
    try {
        const dbPage = await db.select().from(page).where(
            eq(page.id, page_id)
        ).then(res => res[0]);
        if (await canAccessPage(dbPage.funnelId)) {
            return { dbPage }
        }
        return { error: 'You do not have access to this page' }
    } catch (error: any) {
        console.log(error);
        return { error: error.message }
    }
}

export async function getPageByFunnelIdAndPath(funnelId: string, pathName: string) {
    try {
        const dbPage = await db.select().from(page).where(
            and(
                eq(page.funnelId, funnelId),
                eq(page.pathName, pathName)
            )
        ).then(res => res[0]);
        return { dbPage }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

/**
 * Delete page
 */
export async function deletePageById(page_id: string) {
    try {
        const { dbPage } = await getPageById(page_id)
        if (!dbPage) {
            return { error: 'Page not found' };
        }
        // Authorizatiom check not required as it is done in getPageById
        await db.delete(page).where(eq(page.id, page_id));
        return { success: true };
    } catch (error: any) {
        console.log(error);
        return { error: error.message };
    }
}

/**
 * Get pages by funnel id
 */
export async function getPagesByFunnelId(funnel_id: string) {
    try {
        if (await canAccessPage(funnel_id)) {
            const pages = await db
                .select()
                .from(page)
                .where(eq(page.funnelId, funnel_id))
                .orderBy(asc(page.order))
                .then(res => res);
            return { pages };
        }
        return { error: 'You do not have access to this funnel' };
    } catch (error: any) {
        console.log(error);
        return { error: error.message };
    }
}
