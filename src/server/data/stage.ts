'use server';

import { eq } from "drizzle-orm";
import { db } from "../db";
import { stage } from "../db/schema";
import { InsertStage, SelectStage } from "../db/schema";

/**
 * Add new stage
 */
export async function addStage(stageDetails: InsertStage) {
    try {
        const insertStage = async (stageDetails: InsertStage) => {
            return await db.insert(stage).values(stageDetails).returning().then(res => res[0])
        }
        const dbStage = insertStage(stageDetails)

        return { dbStage }
    } catch (error: any) {
        console.log(error);
        return { error: error.message }
    }
}

/**
 * Update stage
 * @param stageDetails 
 * @returns 
 */
export async function updateStage(stageDetails: InsertStage) {
    try {
        const dbStage = await db
            .update(stage)
            .set({
                ...stageDetails,
                updatedAt: new Date().toISOString(),
            })
            .where(eq(stage.id, stageDetails.id!))
            .returning().then(res => res[0]);

        return { dbStage }
    } catch (error: any) {
        console.log(error);
        return { error: error.message }
    }
}

/**
 * Update stage
 */
type UpdateStageColumns = {
    id: string;
    name?: string;
    pathName?: string;
    order?: number;
    previewImage?: string;
    funnelId?: string;
};

/**
 * Update specific columns of a stage
 * @param stageDetails 
 * @returns 
 */
export async function updateStageColumns(stageDetails: UpdateStageColumns) {
    try {
        const { id, ...updateData } = stageDetails;
        const dbStage = await db
            .update(stage)
            .set({
                ...updateData,
                updatedAt: new Date().toISOString(),
            })
            .where(eq(stage.id, id))
            .returning()
            .then(res => res[0]);

        return { dbStage }
    } catch (error: any) {
        console.log(error);
        return { error: error.message }
    }
}


/**
 * Get stage by id
 * @param stage_id 
 * @returns 
 */
export async function getStageById(stage_id: string) {
    try {
        const findStage = await db.select().from(stage).where(
            eq(stage.id, stage_id)
        ).then(res => res[0]);
        return { findStage }
    } catch (error: any) {
        console.log(error);
        return { error: error.message }
    }
}

/**
 * Delete stage
 * @param stage_id 
 * @returns 
 */
export async function deleteStage(stage_id: string) {
    try {
        await db.delete(stage).where(eq(stage.id, stage_id));
        return { success: true }
    } catch (error: any) {
        console.log(error);
        return { error: error.message }
    }
}

export async function getStagesByFunnelId(funnel_id: string) {
    try {
        const stages = await db.select().from(stage).where(
            eq(stage.funnelId, funnel_id)
        ).then(res => res);
        return { stages }
    } catch (error: any) {
        console.log(error);
        return { error: error.message }
    }
}