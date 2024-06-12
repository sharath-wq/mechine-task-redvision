import { z } from 'zod';

export const addProductValidation = z.object({
    title: z
        .string({ required_error: 'Title is required.' })
        .min(2, { message: 'Title must be at least 2 characters long.' })
        .max(50, { message: 'Title must be at most 50 characters long.' }),
    author: z
        .string({ required_error: 'Author name is required.' })
        .min(2, { message: 'Author name must be at least 2 characters long.' })
        .max(50, { message: 'Author name must be at most 50 characters long.' }),
    price: z
        .number({ required_error: 'Pages is required.' })
        .int({ message: 'Pages must be an integer.' })
        .positive({ message: 'Pages must be a positive integer.' }),
    pages: z
        .number({ required_error: 'Pages is required.' })
        .int({ message: 'Pages must be an integer.' })
        .positive({ message: 'Pages must be a positive integer.' }),
    category: z
        .string({ required_error: 'Category is required.' })
        .min(2, { message: 'Category must be at least 2 characters long.' })
        .max(30, { message: 'Category must be at most 30 characters long.' }),
    quantity: z
        .number({ required_error: 'Quantity is required.' })
        .min(0, { message: 'Quantity must be a positive number.' }),
});
