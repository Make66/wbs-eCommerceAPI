import { type RequestHandler } from 'express';
import { Category } from '#model';
import type { CategoryInputSchema, CategoryOutputSchema } from '#schema';
import { z } from 'zod/v4';

type CategoryInputDTO = z.infer<typeof CategoryInputSchema>;
type CategoryOutputDTO = z.infer<typeof CategoryOutputSchema>;

export const getCategories: RequestHandler<{}, CategoryOutputDTO[]> = async (req, res) => {
    const categories = await Category.find().lean();
    res.json(categories);
};

export const createCategory: RequestHandler<{}, CategoryOutputDTO, CategoryInputDTO> = async (req, res) => {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.json(category);
};

export const getCategoryById: RequestHandler<{ id: string }, CategoryOutputDTO> = async (req, res) => {
    console.log('getCategoryById req:', req);
    const category = req.category;
    if (!category) throw new Error('Category context lost');
    res.json(category);
};

export const updateCategory: RequestHandler<{ id: string }, CategoryOutputDTO, CategoryInputDTO> = async (req, res) => {
    const { body } = req;
    const { name } = body;

    const category = req.category;
    if (!category) throw new Error('Category context lost');

    category.name = name;
    await category.save();
    res.json(category);
};

export const deleteCategory: RequestHandler<{ id: string }> = async (req, res) => {
    if (!req.category) throw new Error('Category not found');
    const category = req.category;
    const deletedCategory = await Category.findByIdAndDelete(req.category.id);
    res.json({ message: 'Category deleted' });
};
