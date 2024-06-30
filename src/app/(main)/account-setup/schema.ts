import { z } from "zod";
import validator from 'validator';


export const CreateBusinessSchema = z.object({
    name: z.string().min(2, { message: 'Business name must be atleast 2 characters.' }),
    businessEmail: z.string().email({ message: "Email is required" }),
    businessPhone: z.string().refine(validator.isMobilePhone, { message: "Invalid phone number" }),
    address: z.string().min(1),
    city: z.string().min(1),
    postCode: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    businessLogo: z.string().min(1), // May have to remove this
  })