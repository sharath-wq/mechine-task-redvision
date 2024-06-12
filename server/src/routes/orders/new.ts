import express, { Request, Response } from 'express';
import { requireAuth } from '../../middleware/require-auth';
import { Order } from '../../models/orders';
import { Cart } from '../../models/cart';
import { NotFoundError } from '../../errors/not-found-error';

const router = express.Router();

router.post('/api/orders', requireAuth, async (req: Request, res: Response) => {
    const userId = req.currentUser?.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
        throw new NotFoundError();
    }

    const order = Order.build({
        items: cart.items,
        totalPrice: cart.totalPrice,
        userId: cart.userId,
    });

    await order.save();

    res.status(201).send(order);
});

export { router as createOrderRouter };
