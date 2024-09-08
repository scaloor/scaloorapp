import { z } from "zod";

export const PricingTypeEnum = z.enum(["One_time", "Recurring", "Usage_based"]);

export const CreateProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  pricingType: PricingTypeEnum,
  productImage: z.instanceof(File).optional(),
  defaultPrice: z.number().min(0, "Price must be a positive number"),
});

export type CreateProductFormData = z.infer<typeof CreateProductSchema>;
