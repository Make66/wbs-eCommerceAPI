import { Schema, model } from 'mongoose';
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
        total: { type: Number, required: [true, 'Total is required'] }
    },
    {
        timestamps: true
    }
);

const Order = model('Order', orderSchema);
export type OrderDocumentType = InstanceType<typeof Order>;
export default Order;
