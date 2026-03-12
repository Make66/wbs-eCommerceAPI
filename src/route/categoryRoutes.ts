import { Router } from 'express';
import { getCategories, createCategory, getCategoryById, updateCategory, deleteCategory } from '#controller'; 
import { CategoryInputSchema } from '#schema';
import { categoryExists, validateBodyZod } from '#middleware';

const categoryRouter = Router();

categoryRouter.get('/', getCategories);
categoryRouter.post('/', validateBodyZod(CategoryInputSchema), createCategory);
categoryRouter.get('/:id', categoryExists, getCategoryById);
categoryRouter.put('/:id', validateBodyZod(CategoryInputSchema), categoryExists, updateCategory);
categoryRouter.delete('/:id', categoryExists, deleteCategory);

export default categoryRouter;