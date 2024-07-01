'use server';

import { eq } from "drizzle-orm";
import { db } from "../db";
import { stage } from "../db/schema";
import { Stage } from "../db/types";

/**
 * Add new stage
 */
export async function addStage(stageDetails: Stage) {
    try {
        const insertStage = async (stageDetails: Stage) => {
            return await db.insert(stage).values(stageDetails).returning().then(res => res[0])
        }
        const stage_id = insertStage(stageDetails)

        return stage_id
    } catch {
        return console.log('Unable to add stage');
    }
}

/**
 * Update stage
 * @param stageDetails 
 * @returns 
 */
export async function updateStage(stageDetails: Stage) {
    try {
        await db
            .update(stage)
            .set({
                ...stageDetails,
                updatedAt: new Date().toISOString(),
            })
            .where(eq(stage.id, stageDetails.id!));

        return true
    } catch {
        return console.log('Unable to update stage');
    }
}

/**
 * Get stage by id
 * @param stage_id 
 * @returns 
 */
export async function getStageById(stage_id: number) {
    try {
        const findStage = await db.select().from(stage).where(
            eq(stage.id, stage_id)
        ).then(res => res[0]);
        return findStage
    } catch {
        return console.log('Unable to find stage');
    }
}

/**
 * Delete stage
 * @param stage_id 
 * @returns 
 */
export async function deleteStage(stage_id: number) {
    try {
        await db.delete(stage).where(eq(stage.id, stage_id));
        return true
    } catch {
        return console.log('Unable to delete stage');
    }
}

export async function getStagesByFunnelId(funnel_id: number) {
    try {
        const stages = await db.select().from(stage).where(
            eq(stage.funnelId, funnel_id)
        ).then(res => res);
        return stages
    } catch {
        return console.log('Unable to get stages by funnel id');
    }
}