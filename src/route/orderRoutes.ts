import { Router } from 'express';
import { getOrders, createOrder, getOrderById, updateOrder, deleteOrder } from '#controller'; 
import { OrderInputSchema } from '#schema';
import { orderExists, orderProductExists, orderUserExists, validateBodyZod } from '#middleware';

const orderRouter = Router();

orderRouter.get('/', getOrders);
orderRouter.post('/', validateBodyZod(OrderInputSchema), orderUserExists, orderProductExists, createOrder);
orderRouter.get('/:id', orderExists, getOrderById);
orderRouter.put('/:id', validateBodyZod(OrderInputSchema), orderExists, orderUserExists, orderProductExists, updateOrder);
orderRouter.delete('/:id', orderExists, deleteOrder);

export default orderRouter;