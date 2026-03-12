import { z } from 'zod/v4';
import { isValidObjectId, Types } from 'mongoose';

export const ProductInputSchema = z.strictObject({
  name: z
    .string({ error: 'Product name must be a string' })
    .min(2, { message: 'Product name is required and must be at least 2 characters long' }),
  description: z
    .string({ error: 'Description must be a string' })
    .min(10, { message: 'Description is required and must be at least 10 characters long' }),
  price: z.number({ error: 'Price must be a number' }).positive({ message: 'Price must be a positive number' }),
  categoryId: z
    .string({ error: 'CategoryId must be a string' })
    .refine(val => isValidObjectId(val), { error: 'Invalid category ID' })
    .transform(val => new Types.ObjectId(val))
});

export const ProductOutputSchema = z.strictObject({
  _id: z.instanceof(Types.ObjectId),
  ...ProductInputSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date()
});
