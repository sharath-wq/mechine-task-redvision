import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.currentUser);

    if (req.currentUser?.role !== 'admin') {
        throw new NotAuthorizedError();
    }

    next();
};
