import express, { Request, Response } from 'express';
import { Book } from '../../models/book';
import { requireAdmin } from '../../middleware/require-admin';
import { validateRequest } from '../../middleware/validate-request';
import { validateBook } from '../../middleware/book-validator';
import { requireAuth } from '../../middleware/require-auth';

const router = express.Router();

router.post('/api/books', requireAuth, requireAdmin, validateBook, validateRequest, async (req: Request, res: Response) => {
    const { author, category, imageUrl, pages, price, title, quantity } = req.body;

    const book = Book.build({
        author,
        category,
        imageUrl,
        pages,
        price,
        title,
        quantity,
    });

    await book.save();

    res.status(201).send(book);
});

export { router as createBookRouter };
