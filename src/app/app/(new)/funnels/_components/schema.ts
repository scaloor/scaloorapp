import { z } from "zod";


export const CreateFunnelSchema = z.object({
    name: z.string().min(2, { message: 'Funnel name must be at least 2 characters.' }),
});