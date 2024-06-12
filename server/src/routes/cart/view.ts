import express, { Request, Response } from 'express';
import { Cart } from '../../models/cart';
import { NotFoundError } from '../../errors/not-found-error';
import { requireAuth } from '../../middleware/require-auth';
import { NotAuthorizedError } from '../../errors/not-authorized-error';

const router = express.Router();

router.get('/api/cart', requireAuth, async (req: Request, res: Response) => {
    const cart = await Cart.findOne({ userId: req.currentUser!.id }).populate('items.productId');

    if (!cart) {
        throw new NotFoundError();
    }

    res.send(cart);
});

export { router as viewCartRouter };
