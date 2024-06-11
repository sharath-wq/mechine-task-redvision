import { body } from 'express-validator';

const validateCart = [body('items').isArray().notEmpty()];

export { validateCart };
