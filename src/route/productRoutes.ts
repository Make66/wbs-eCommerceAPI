import { Router } from 'express';
import { getProducts, createProduct, getProductById, updateProduct, deleteProduct } from '#controller';
import { ProductInputSchema } from '#schema';
import { categoryExists, productCategoryExists, productExists, validateBodyZod } from '#middleware';

const productRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64a7b2c3d4e5f6a7b8c9d0e1"
 *         name:
 *           type: string
 *           example: "Wireless Headphones"
 *         description:
 *           type: string
 *           example: "High-quality wireless headphones with noise cancellation"
 *         price:
 *           type: number
 *           example: 99.99
 *         categoryId:
 *           type: string
 *           example: "64a7b2c3d4e5f6a7b8c9d0e1"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ProductInput:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - categoryId
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           example: "Wireless Headphones"
 *         description:
 *           type: string
 *           minLength: 10
 *           example: "High-quality wireless headphones with noise cancellation"
 *         price:
 *           type: number
 *           minimum: 0
 *           exclusiveMinimum: true
 *           example: 99.99
 *         categoryId:
 *           type: string
 *           description: Valid MongoDB ObjectId of an existing category
 *           example: "64a7b2c3d4e5f6a7b8c9d0e1"
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Category not found
 */
productRouter.get('/', getProducts);
productRouter.post('/', validateBodyZod(ProductInputSchema), productCategoryExists, createProduct);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Product or category not found
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
productRouter.get('/:id', productExists, getProductById);
productRouter.put('/:id', validateBodyZod(ProductInputSchema), productExists, productCategoryExists, updateProduct);
productRouter.delete('/:id', productExists, deleteProduct);

export default productRouter;
