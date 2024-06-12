import express, { Request, Response } from 'express';
import { Book } from '../../models/book';
import { NotFoundError } from '../../errors/not-found-error';

const router = express.Router();

router.get('/api/books/options', async (req: Request, res: Response) => {
    try {
        const distinctCategoriesResult = await Book.aggregate([
            { $group: { _id: '$category' } },
            { $sample: { size: 5 } },
            { $project: { _id: 0, category: '$_id' } }, // Reshape the document
        ]);

        const distinctAuthorsResult = await Book.aggregate([
            { $group: { _id: '$author' } },
            { $sample: { size: 5 } },
            { $project: { _id: 0, author: '$_id' } }, // Reshape the document
        ]);

        const distinctCategories = distinctCategoriesResult.map((doc) => doc.category);
        const distinctAuthors = distinctAuthorsResult.map((doc) => doc.author);

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
