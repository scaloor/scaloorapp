'use server';

import { BlockComponent } from "@/app/(main)/editor/[stageId]/_components/providers/editor-types";
import { getStageById } from "@/server/data/stage";
import { db } from "@/server/db";
import { stage } from "@/server/db/schema";
import { OutputData } from "@editorjs/editorjs";
import { eq } from "drizzle-orm";

export async function testData(outputData: OutputData) {
    console.log(outputData)

}

export async function saveStageContent(stageId: number, content: BlockComponent[]) {
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