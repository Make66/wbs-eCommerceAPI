import { z } from 'zod/v4';
import { Order } from '#model';
import { type RequestHandler } from 'express';
import type { OrderInputSchema, OrderOutputSchema } from '#schema';

type OrderInputDTO = z.infer<typeof OrderInputSchema>;
type OrderOutputDTO = z.infer<typeof OrderOutputSchema>;

export const getOrders: RequestHandler<{}, OrderOutputDTO[]> = async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
};

export const createOrder: RequestHandler<{}, OrderOutputDTO, OrderInputDTO> = async (req, res) => {
    const { userId, products, total } = req.body;
    const order = await Order.create({ userId, products, total });
    res.json(order);
};

export const getOrderById: RequestHandler<{ id: string }, OrderOutputDTO> = async (req, res) => {
    console.log('getOrderById req:', req);
    const order = req.order;
    if (!order) throw new Error('Order context lost');
    res.json(order);
};

export const updateOrder: RequestHandler<{ id: string }, OrderOutputDTO, OrderInputDTO> = async (req, res) => {
    const { body } = req;
    const { userId, products, total } = body;

    const order = req.order;
    if (!order) throw new Error('Order context lost');

    order.userId = userId;
    order.set('products', products);
    order.total = total;
    await order.save();
    res.json(order);
};

export const deleteOrder: RequestHandler<{ id: string }> = async (req, res) => {
    if (!req.order) throw new Error('Order not found');
    const order = req.order;
    await Order.findByIdAndDelete(req.order.id);
    res.json({ message: 'Order deleted' });
};
