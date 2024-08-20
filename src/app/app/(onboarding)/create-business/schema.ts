import { z } from "zod";
import validator from 'validator';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 10; // 10MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];


export const CreateBusinessSchema = z.object({
  name: z.string().min(2, { message: 'Business name must be at least 2 characters.' }),
  businessEmail: z.string().email({ message: "Email is required" }),
  /* businessPhone: z.string().refine(validator.isMobilePhone, { message: "Invalid phone number" }), */
  country: z.string().min(1),
  businessLogo: z.instanceof(File)
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, 'File size must be less than 10MB')
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file!.type);
    }, 'File must be a PNG').optional()
})