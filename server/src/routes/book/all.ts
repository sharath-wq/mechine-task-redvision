import express, { Request, Response } from 'express';
import { Book } from '../../models/book';

interface BookQuery {
    category?: string;
    author?: string;
    search?: string;
    page?: string | number;
    limit?: string | number;
}

const router = express.Router();

router.get('/api/books', async (req: Request<{}, {}, {}, BookQuery>, res: Response) => {
    let query: any = {};

    // Filtering by category
    if (req.query.category) {
        query['category'] = req.query.category;
    }

    // Filtering by author
    if (req.query.author) {
        query['author'] = req.query.author;
    }

    // Pagination
    const page = parseInt(req.query.page as string) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit as string) || 10; // Default limit to 10 if not specified
    const skip = (page - 1) * limit;

    // Searching by title or author
    if (req.query.search) {
        query['$or'] = [
            { title: { $regex: req.query.search, $options: 'i' } }, // Case-insensitive search by title
            { author: { $regex: req.query.search, $options: 'i' } }, // Case-insensitive search by author
        ];
    }

    const books = await Book.find(query).skip(skip).limit(limit);
    res.send(books);
});

export { router as getAllBooksRouter };
