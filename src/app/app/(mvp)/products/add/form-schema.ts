import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 100; // 100MB

export const CreateCheckoutSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().optional(),
    price: z.string(),
    productImage: z.instanceof(File).refine((file) => file.size <= MAX_UPLOAD_SIZE, { message: "File size must be less than 10MB" }).optional(),
    file: z.instanceof(File).refine((file) => file.size <= MAX_UPLOAD_SIZE, { message: "File size must be less than 100MB" }),
});

