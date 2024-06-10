import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../../models/user';
import { validateRequest } from '../../middleware/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';
import { Cart } from '../../models/cart';

const router = express.Router();

router.post(
    '/api/users/signup',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('displayName').isString().isLength({ min: 3 }).withMessage('Name must be 3 character long'),
        body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password, displayName } = req.body;

        const existingUser = await User.findOne({ email });

        // checking the email alrady exists
        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        // create user without cart id
        const user = User.build({ email, password, displayName });

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
    }
);

export { router as signupRouter };
