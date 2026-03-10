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
                productId: Schema.Types.ObjectId,
                quantity: {
                    type: Number
                }
            }
        ],
        total: Number
    },
    {
        timestamps: true
    }
);

const Order = model('Order', orderSchema);
export type OrderDocumentType = InstanceType<typeof Order>;
export default Order;
