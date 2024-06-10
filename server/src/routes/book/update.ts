import express, { Request, Response } from 'express';
import { validateBook } from '../../middleware/book-validator';
import { validateRequest } from '../../middleware/validate-request';
import { Book } from '../../models/book';
import { NotFoundError } from '../../errors/not-found-error';
import { requireAdmin } from '../../middleware/require-admin';

const router = express.Router();

router.put('/api/books/:id', requireAdmin, validateBook, validateRequest, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { author, category, imageUrl, pages, price, title } = req.body;

    const book = await Book.findById(id);

    if (!book) {
        throw new NotFoundError();
    }

    book.set({
        author,
        category,
        imageUrl,
        pages,
        price,
        title,
    });

    await book.save();

    res.send(book);
});

export { router as updateBookRouter };
