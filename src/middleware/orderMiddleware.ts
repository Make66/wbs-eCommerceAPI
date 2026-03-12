import { Order } from '#model';
import type { NextFunction, Request, Response } from 'express';

export async function orderExists(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) throw new Error('No order found', { cause: 404 });
    req.order = order;
    next();
}