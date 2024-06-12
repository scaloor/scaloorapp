'use server';

import { getStageById } from "@/server/data/stage";
import { db } from "@/server/db";
import { stage } from "@/server/db/schema";
import { Value } from "@udecode/plate-common/server";
import { eq } from "drizzle-orm";

export async function testData(outputData: Value) {
    console.log(outputData)

}

export async function saveStageContent(stageId: number, content: Value) {
    try {
        const saveStage = await getStageById(stageId);
        if (!saveStage) {
            return console.log('Stage not found');
        }
        await db.update(stage)
            .set({ content })
            .where(eq(stage.id, stageId));
        console.log('Stage content saved successfully');
    } catch (error) {
        console.error('Error saving stage content:', error);
    }
}