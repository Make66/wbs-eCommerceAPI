import { Order, Product, User } from '#model';
import type { NextFunction, Request, Response } from 'express';

export async function orderExists(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) throw new Error('No order found', { cause: 404 });
    req.order = order;
    next();
}

export async function orderUserExists(req: Request, res: Response, next: NextFunction) {
    const id = (req.body.userId);
    const user = await User.findById(id);
    if (!user) throw new Error('User in order not found', { cause: 404 });
    req.body.user = user;
    next();
}

export async function orderProductExists(req: Request, res: Response, next: NextFunction) {
    console.log('a) orderProductExists req.body:', req.body);

    const products = (req.body.products) as { productId: string; quantity: number }[];
    let totalPrice = 0;
    req.body.product = await Promise.all(products.map(async p => {
        const product = await Product.findById(p.productId);
        if (!product) throw new Error('Product in order not found', { cause: 404 });
        totalPrice += product.price * p.quantity;
        return product.toObject();
    }));    
    req.body.totalPrice = totalPrice;
    console.log('b) orderProductExists req.body:', req.body);
    next();
}

