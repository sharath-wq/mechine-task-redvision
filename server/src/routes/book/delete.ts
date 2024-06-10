import express, { Request, Response } from 'express';
import { requireAdmin } from '../../middleware/require-admin';
import { Book } from '../../models/book';
import { NotFoundError } from '../../errors/not-found-error';

const router = express.Router();

router.delete('/api/books/:id', requireAdmin, async (req: Request, res: Response) => {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
        throw new NotFoundError();
    }

    await Book.findByIdAndDelete(id);

    res.send(book);
});

export { router as deleteBookRouter };
