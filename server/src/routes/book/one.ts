import express, { Request, Response } from 'express';
import { Book } from '../../models/book';
import { NotFoundError } from '../../errors/not-found-error';

const router = express.Router();

router.get('/api/books/:id', async (req: Request, res: Response) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        throw new NotFoundError();
    }

    res.send(book);
});

export { router as getOneBookRouter };
