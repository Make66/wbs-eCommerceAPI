import { Schema, model } from 'mongoose';
const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category is required"],
        }
    },
    {
        timestamps: true
    }
);

const Product = model('Product', productSchema);
export type ProductDocumentType = InstanceType<typeof Product>;
export default Product;
