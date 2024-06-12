import express, { Request, Response } from 'express';
import { Book } from '../../models/book';
import { NotFoundError } from '../../errors/not-found-error';

const router = express.Router();

router.get('/api/books/options', async (req: Request, res: Response) => {
    try {
        const distinctCategories = await Book.distinct('category');
        const distinctAuthors = await Book.distinct('author');
        res.send({
            categories: distinctCategories,
            authors: distinctAuthors,
        });
    } catch (err) {
        console.error(err);
        throw new NotFoundError();
    }
});

export { router as getBookOptionsRouter };
