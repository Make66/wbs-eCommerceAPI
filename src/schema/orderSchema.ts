import {z} from "zod/v4";
import { isValidObjectId, Types } from 'mongoose';

const OrderItemSchema = z.object({
    productId: z.instanceof(Types.ObjectId),
    quantity: z.number().int().positive()
});

export const OrderInputSchema = z.strictObject({
    userId: z
        .string({ error: 'User ID must be a string' })
        .refine((val) => isValidObjectId(val), { message: 'User ID must be a valid ObjectId' })
        .transform((val) => new Types.ObjectId(val)),
    products: z
        .array(OrderItemSchema)
        .min(1, { message: 'At least one product is required' }),
    total: z.number({ error: 'Total must be a number' }).positive({ message: 'Total must be a positive number' })
});

export const OrderOutputSchema = z.strictObject({
    _id: z.instanceof(Types.ObjectId),
    ...OrderInputSchema.shape, 
    createdAt: z.date(),
    updatedAt: z.date()
});