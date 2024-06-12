import express, { Request, Response } from 'express';
import { requireAuth } from '../../middleware/require-auth';
import { Order } from '../../models/orders';

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
    const orders = await Order.find({ userId: req.currentUser!.id }).populate('items.productId');

    console.log(orders);

    res.send(orders);
});

export { router as viewOrdersRouter };
