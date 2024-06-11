import express from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { Password } from '../../services/password';
import { User } from '../../models/user';
import { validateRequest } from '../../middleware/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';
import { validateLogin } from '../../middleware/user-validator';

const router = express.Router();

router.post('/api/users/signin', validateLogin, validateRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new BadRequestError('Invalid Credentials');
    }

    const passwordsMatch = await Password.compare(existingUser.password, password);

    if (!passwordsMatch) {
        throw new BadRequestError('Invalid Credentials');
    }

    const userJwt = jwt.sign(
        {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
        },
        process.env.JWT_KEY!
    );

    req.session = {
        jwt: userJwt,
    };

    res.status(200).send(existingUser);
});

export { router as signinRouter };
