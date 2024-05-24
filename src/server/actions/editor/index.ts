'use server';

import { OutputData } from "@editorjs/editorjs";

export async function testData(outputData: OutputData) {
    console.log(outputData.blocks)

}