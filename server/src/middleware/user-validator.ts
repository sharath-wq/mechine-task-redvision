import { body } from 'express-validator';

const validateUser = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('displayName').isString().isLength({ min: 3 }).withMessage('Name must be 3 character long'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters'),
];

export { validateUser };
