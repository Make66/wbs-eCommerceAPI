import { z } from 'zod/v4';
import { Types } from 'mongoose';

export const CategoryInputSchema = z.strictObject({
  name: z
    .string({ error: 'Category must be a string' })
    .min(2, { message: 'Category name is required and must be at least 2 characters long' }),
});

export const CategoryOutputSchema = z.strictObject({
  _id: z.instanceof(Types.ObjectId),
  ...CategoryInputSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date()
});
