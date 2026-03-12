import { Router } from 'express';
import { getProducts, createProduct, getProductById, updateProduct, deleteProduct } from '#controller'; 
import { ProductInputSchema } from '#schema';
import { categoryExists, productCategoryExists, productExists, validateBodyZod } from '#middleware';

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.post('/', validateBodyZod(ProductInputSchema), productCategoryExists, createProduct);
productRouter.get('/:id', productExists, getProductById);
productRouter.put('/:id', validateBodyZod(ProductInputSchema), productExists, productCategoryExists, updateProduct);
productRouter.delete('/:id', productExists, deleteProduct);

export default productRouter;