import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../../models/user';
import { validateRequest } from '../../middleware/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';
import { Cart } from '../../models/cart';
import { validateUser } from '../../middleware/user-validator';

const router = express.Router();

router.post('/api/users/signup', validateUser, validateRequest, async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });

    // checking the email alrady exists
    if (existingUser) {
        throw new BadRequestError('Email in use');
    }

    // create user without cart id
    const user = User.build({ email, password, name });

    // creating cart with user id
    const cart = Cart.build({
        userId: user.id,
        items: [],
        totalPrice: 0,
    });

    // adding cart id to user
    user.cartId = cart.id;

    await cart.save();
    await user.save();

    // creating jwt token
    const userJwt = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_KEY!
    );

    // seting the jwt key in sessoion
    req.session = {
        jwt: userJwt,
    };

    // sedning resposne
    res.status(201).send(user);
});

export { router as signupRouter };
