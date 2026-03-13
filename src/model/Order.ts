import { Schema, model } from 'mongoose';
import type { optional } from 'zod';
const orderSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required']
        },
        products: [
            {
                productId: { type: Schema.Types.ObjectId, required: true },
                quantity: { type: Number, required: true }
            }
        ],
        total: { type: Number, optional: [true, 'Total is optional'] }
    },
    {
        timestamps: true
    }
);

const Order = model('Order', orderSchema);
export type OrderDocumentType = InstanceType<typeof Order>;
export default Order;
