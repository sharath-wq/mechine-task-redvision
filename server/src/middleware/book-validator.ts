import { body } from 'express-validator';

const validateBook = [
    body('title').isString().withMessage('Title must be a string').notEmpty().withMessage('Title is required'),
    body('author').isString().withMessage('Author must be a string').notEmpty().withMessage('Author is required'),
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be a number greater than 0')
        .notEmpty()
        .withMessage('Price is required'),
    body('pages')
        .isInt({ gt: 0 })
        .withMessage('Pages must be an integer greater than 0')
        .notEmpty()
        .withMessage('Pages are required'),
    body('category').isString().withMessage('Category must be a string').notEmpty().withMessage('Category is required'),
    body('imageUrl')
        .isString()
        .withMessage('Image URL must be a string')
        .notEmpty()
        .withMessage('Image URL is required')
        .isURL()
        .withMessage('Image URL must be a valid URL'),
];

export { validateBook };
