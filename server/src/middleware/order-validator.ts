import { body } from 'express-validator';

export const validateOrder = [
    body('userId').not().isEmpty().withMessage('User ID is required').isMongoId().withMessage('Invalid User ID'),
    body('items').isArray({ min: 1 }).withMessage('Items must be an array with at least one item'),
    body('items.*.productId')
        .not()
        .isEmpty()
        .withMessage('Product ID is required')
        .isMongoId()
        .withMessage('Invalid Product ID'),
    body('items.*.quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
    body('items.*.price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('totalPrice').isFloat({ gt: 0 }).withMessage('Total price must be a positive number'),
    body('status')
        .not()
        .isEmpty()
        .withMessage('Status is required')
        .isIn(['pending', 'completed', 'cancelled'])
        .withMessage('Invalid status'),
    body('orderDate').isISO8601().withMessage('Order date must be a valid date'),
];
