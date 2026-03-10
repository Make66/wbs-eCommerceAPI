import { Router } from 'express';
import { getProducts, createProducts, getProductById, updateProducts, deleteProduct } from '#controller'; 

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.post('/', validateBodyZod(productInputSchema), createProducts);
productRouter.get('/:id', productExists, getProductById);
productRouter.put('/:id', validateBodyZod(productInputSchema), productExists, updateProducts);
productRouter.delete('/:id', userExists, deleteUser);

export default userRouter;