import { type RequestHandler } from 'express';
import { Product } from '#model';
import type { ProductInputSchema, ProductOutputSchema } from '#schema';
import { z } from 'zod/v4';

type ProductInputDTO = z.infer<typeof ProductInputSchema>;
type ProductOutputDTO = z.infer<typeof ProductOutputSchema>;

export const getProducts: RequestHandler<{}, ProductOutputDTO[]> = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

export const createProduct: RequestHandler<{}, ProductOutputDTO, ProductInputDTO> = async (req, res) => {
    const { name, description, price, categoryId } = req.body;
    const product = await Product.create({ name, description, price, categoryId });
    res.json(product);
};

export const getProductById: RequestHandler<{ id: string }, ProductOutputDTO> = async (req, res) => {
    console.log('getProductById req:', req);
    const product = req.product;
    if (!product) throw new Error('Product context lost');
    res.json(product);
};

export const updateProduct: RequestHandler<{ id: string }, ProductOutputDTO, ProductInputDTO> = async (req, res) => {
    const { body } = req;
    const { name, description, price, categoryId } = body;

    const product = req.product;
    if (!product) throw new Error('Product context lost');

    product.name = name;
    product.description = description;
    product.price = price;
    product.categoryId = categoryId;
    await product.save();
    res.json(product);
};

export const deleteProduct: RequestHandler<{ id: string }> = async (req, res) => {
    if (!req.product) throw new Error('Product not found');
    const product = req.product;
    const deletedProduct = await Product.findByIdAndDelete(req.product.id);
    res.json({ message: 'Product deleted' });
};
