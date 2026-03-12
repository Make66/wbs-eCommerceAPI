import { Category, Product } from '#model';
import type { NextFunction, Request, Response } from 'express';

export async function categoryExists(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) throw new Error('No category found', { cause: 404 });
    req.category = category;
    next();
}
