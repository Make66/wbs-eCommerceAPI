import { z } from 'zod/v4';
import { Types } from 'mongoose';

export const UserInputSchema = z.strictObject({
  firstName: z
    .string({ error: 'firstName must be a string' })
    .min(2, { message: 'firstName is required and must be at least 2 characters long' }),
  lastName: z
    .string({ error: 'lastName must be a string' })
    .min(2, { message: 'lastName is required and must be at least 2 characters long' }),
  email: z.email({ error: 'email must be a valid email address' }),
  password: z
    .string({ error: 'Password must be a string' })
    .min(12, { error: 'Password must be at least 12 characters.' })
    .max(512, { error: 'The length of this Password is excessive.' })
    .regex(/[a-z]/, { error: 'Password must include at least one lowercase letter.' })
    .regex(/[A-Z]/, { error: 'Password must include at least one uppercase letter.' })
    .regex(/[0-9]/, { error: 'Password must include at least one number.' })
    .regex(/[!@#$%^&*()_+\-=\[\]{}|;:'",.<>/?`~]/, {
      error: 'Password must include at least one special character'
    }),
  isActive: z.boolean().default(true)
});

export const UserOutputSchema = z.strictObject({
  _id: z.instanceof(Types.ObjectId),
  ...UserInputSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date()
});
