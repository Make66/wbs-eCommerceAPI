import { Document, Schema, model } from 'mongoose';
import { Types } from 'mongoose';

interface IOrder extends Document {
    userId: Types.ObjectId;
    products: { productId: Types.ObjectId; quantity: number }[];
    total?: number;
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
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
