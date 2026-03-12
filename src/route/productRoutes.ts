import { Router } from 'express';
import { getProducts, createProduct, getProductById, updateProduct, deleteProduct } from '#controller'; 
import { ProductInputSchema } from '#schema';
import { productExists, validateBodyZod } from '#middleware';

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.post('/', validateBodyZod(ProductInputSchema), createProduct);
productRouter.get('/:id', productExists, getProductById);
productRouter.put('/:id', validateBodyZod(ProductInputSchema), productExists, updateProduct);
productRouter.delete('/:id', productExists, deleteProduct);

export default productRouter;