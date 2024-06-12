import request from 'supertest';
import { app } from '../../../app';
import { Book } from '../../../models/book';

const createTestBook = async (title: string, author: string, category: string) => {
    const book = Book.build({
        title: title,
        author: author,
        category: category,
        imageUrl: 'http://example.com/image.jpg',
        pages: 100,
        price: 20,
        quantity: 10,
    });
    await book.save();
    return book;
};

describe('GET /api/books/options', () => {
    it('returns 200 and distinct categories and authors if books exist', async () => {
        // Create test books
        await createTestBook('Book1', 'Author1', 'Category1');
        await createTestBook('Book2', 'Author2', 'Category2');

        const response = await request(app).get('/api/books/options').send();

        expect(response.status).toEqual(200);
        expect(response.body.categories).toEqual(['Category1', 'Category2']);
        expect(response.body.authors).toEqual(['Author1', 'Author2']);
    });

    it('returns 200 with empty arrays if no books exist', async () => {
        const response = await request(app).get('/api/books/options').send();

        expect(response.status).toEqual(200);
        expect(response.body.categories).toEqual([]);
        expect(response.body.authors).toEqual([]);
    });
});
