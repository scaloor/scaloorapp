import { z } from "zod";
import validator from 'validator';

export const EditUserSchema = z.object({ 
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: "Email is required" }),
  mobile: z.string().refine(validator.isMobilePhone, { message: "Invalid phone number" }).optional(),
  
})