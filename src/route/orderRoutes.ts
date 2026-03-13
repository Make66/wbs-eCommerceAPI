import { Router } from 'express';
import { getOrders, createOrder, getOrderById, updateOrder, deleteOrder } from '#controller';
import { OrderInputSchema } from '#schema';
import { orderExists, orderProductExists, orderUserExists, validateBodyZod } from '#middleware';

const orderRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *           description: Valid MongoDB ObjectId of an existing product
 *           example: "64a7b2c3d4e5f6a7b8c9d0e1"
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           example: 2
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64a7b2c3d4e5f6a7b8c9d0e1"
 *         userId:
 *           type: string
 *           example: "64a7b2c3d4e5f6a7b8c9d0e2"
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         total:
 *           type: number
 *           example: 199.98
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     OrderInput:
 *       type: object
 *       required:
 *         - userId
 *         - products
 *       properties:
 *         userId:
 *           type: string
 *           description: Valid MongoDB ObjectId of an existing user
 *           example: "64a7b2c3d4e5f6a7b8c9d0e2"
 *         products:
 *           type: array
 *           minItems: 1
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         total:
 *           type: number
 *           minimum: 0
 *           exclusiveMinimum: true
 *           example: 199.98
 */

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Validation error
 *       404:
 *         description: User or product not found
 */
orderRouter.get('/', getOrders);
orderRouter.post('/', validateBodyZod(OrderInputSchema), orderUserExists, orderProductExists, createOrder);

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *   put:
 *     summary: Update an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Order, user, or product not found
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
orderRouter.get('/:id', orderExists, getOrderById);
orderRouter.put('/:id', validateBodyZod(OrderInputSchema), orderExists, orderUserExists, orderProductExists, updateOrder);
orderRouter.delete('/:id', orderExists, deleteOrder);

export default orderRouter;
