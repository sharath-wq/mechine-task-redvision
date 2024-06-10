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
    });
    await book.save();
    return book;
};

it('returns 200 and the correct book if valid ID is provided', async () => {
    const book = await createTestBook('Book1', 'Author1', 'Category1');

    const response = await request(app).get(`/api/books/${book.id}`).send();

    expect(response.status).toEqual(200);
    expect(response.body.title).toEqual('Book1');
    expect(response.body.author).toEqual('Author1');
    expect(response.body.category).toEqual('Category1');
});

it('returns 404 if valid ID is provided but book is not found', async () => {
    // Create a book but don't save it to ensure it doesn't exist
    const book = Book.build({
        title: 'Book1',
        author: 'Author1',
        category: 'Category1',
        imageUrl: 'http://example.com/image.jpg',
        pages: 100,
        price: 20,
    });

    const response = await request(app).get(`/api/books/${book.id}`).send();

    expect(response.status).toEqual(404);
});
