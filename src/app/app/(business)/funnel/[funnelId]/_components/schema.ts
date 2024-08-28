import { z } from "zod";


export const EditStageSchema = z.object({
    id: z.string(),
    name: z.string().min(2, { message: 'Funnel name must be at least 2 characters.' }),
    pathName: z.string().min(1, { message: 'Pathname must be at least 1 character' }),
});