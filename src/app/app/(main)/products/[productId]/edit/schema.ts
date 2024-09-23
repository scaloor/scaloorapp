import { z } from "zod";

export const PricingTypeEnum = z.enum(["one_time",/*  "recurring" */]);

export const EditProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  pricingType: PricingTypeEnum,
  productImage: z.instanceof(File).optional(),
  defaultPrice: z.string().min(0, "Price must be a positive number"),
});

export type EditProductFormData = z.infer<typeof EditProductSchema>;
