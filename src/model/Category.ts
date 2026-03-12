import { Schema, model } from 'mongoose';
const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Category name is required'],
            trim: true
        },
    },
    {
        timestamps: true
    }
);

const Category = model('Category', CategorySchema);
export type CategoryDocumentType = InstanceType<typeof Category>;
export default Category;
