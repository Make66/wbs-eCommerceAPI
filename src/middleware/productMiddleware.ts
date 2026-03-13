import { Category, Product } from '#model';
import type { NextFunction, Request, Response } from 'express';

export async function productExists(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) throw new Error('No product found', { cause: 404 });
    req.product = product;
    next();
}

export async function productCategoryExists(req: Request, res: Response, next: NextFunction) {
    const id = (req.body.categoryId);
    const category = await Category.findById(id);
    if (!category) throw new Error('Category not found', { cause: 404 });
    req.category = category;
    next();
}