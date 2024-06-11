import express, { Request, Response } from 'express';
import { NotFoundError } from '../../errors/not-found-error';
import { requireAuth } from '../../middleware/require-auth';
import { Cart, CartItem } from '../../models/cart';
import { validateCart } from '../../middleware/cart-validator';
import { validateRequest } from '../../middleware/validate-request';

const router = express.Router();

router.put('/api/cart', validateCart, validateRequest, requireAuth, async (req: Request, res: Response) => {
    const { items } = req.body;

    const cart = await Cart.findOne({ userId: req.currentUser!.id });

    if (!cart) {
        throw new NotFoundError();
    }

    cart.set({
        items,
    });

    await cart.save();

    res.send(cart);
});

export { router as updateCartRouter };
