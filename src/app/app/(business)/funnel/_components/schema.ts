import { z } from "zod";


export const CreateFunnelSchema = z.object({
    name: z.string().min(2, { message: 'Funnel name must be at least 2 characters.' }),
    description: z.string().min(2, { message: 'Funnel description must be at least 2 characters.' }).optional(),
    subDomainName: z.string().min(2, { message: 'Subdomain name must be at least 2 characters.' }),
});