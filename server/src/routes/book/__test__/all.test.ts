import request from 'supertest';
import { app } from '../../../app';
import { Book } from '../../../models/book';

const createTestBook = async (title: string, author: string, category: string) => {
    const book = Book.build({
        title,
        author,
        category,
        imageUrl: 'http://example.com/image.jpg',
        pages: 100,
        price: 20,
        quantity: 10,
    });
    await book.save();
    return book;
};

it('has a route handler listening to /api/books for get requests', async () => {
    const response = await request(app).get('/api/books').send({});
    expect(response.status).not.toEqual(404);
});

it('returns all books if no query parameters are provided', async () => {
    await createTestBook('Book1', 'Author1', 'Category1');
    await createTestBook('Book2', 'Author2', 'Category2');

    const response = await request(app).get('/api/books').send({});

    expect(response.body.length).toEqual(2);
});

it('filters books by category if category query parameter is provided', async () => {
    await createTestBook('Book1', 'Author1', 'Category1');
    await createTestBook('Book2', 'Author2', 'Category2');

    const response = await request(app).get('/api/books').query({ category: 'Category1' }).send({});

    expect(response.body.length).toEqual(1);
    expect(response.body[0].category).toEqual('Category1');
});

it('filters books by author if author query parameter is provided', async () => {
    await createTestBook('Book1', 'Author1', 'Category1');
    await createTestBook('Book2', 'Author2', 'Category2');

    const response = await request(app).get('/api/books').query({ author: 'Author2' }).send({});

    expect(response.body.length).toEqual(1);
    expect(response.body[0].author).toEqual('Author2');
});

it('performs pagination if page and limit query parameters are provided', async () => {
    await createTestBook('Book1', 'Author1', 'Category1');
    await createTestBook('Book2', 'Author2', 'Category2');
    await createTestBook('Book3', 'Author3', 'Category3');

    const response = await request(app).get('/api/books').query({ page: 2, limit: 1 }).send({});

    expect(response.body.length).toEqual(1);
    expect(response.body[0].title).toEqual('Book2');
});

it('searches books by title if search query parameter is provided', async () => {
    await createTestBook('Awesome Book', 'Author1', 'Category1');
    await createTestBook('Another Great Book', 'Author2', 'Category2');
    await createTestBook('Fantastic Book', 'Author3', 'Category3');

    const response = await request(app).get('/api/books').query({ search: 'great' }).send({});

    expect(response.body.length).toEqual(1);
    expect(response.body.map((book: any) => book.title)).toContain('Another Great Book');
});

it('searches books by author if search query parameter is provided', async () => {
    await createTestBook('Awesome Book', 'Author1', 'Category1');
    await createTestBook('Another Great Book', 'Author2', 'Category2');
    await createTestBook('Fantastic Book', 'Author1', 'Category3');

    const response = await request(app).get('/api/books').query({ search: 'Author1' }).send({});

    expect(response.body.length).toEqual(2);
    expect(response.body.map((book: any) => book.author)).toContain('Author1');
});

it('filter books by category if filter query parameter is provided', async () => {
    await createTestBook('Awesome Book', 'Author1', 'Category1');
    await createTestBook('Another Great Book', 'Author2', 'Category2');
    await createTestBook('Fantastic Book', 'Author3', 'Category3');

    const response = await request(app).get('/api/books').query({ category: 'Category1' }).send({});

    expect(response.body.length).toEqual(1);
    expect(response.body.map((book: any) => book.category)).toContain('Category1');
});

it('filter books by author if author query parameter is provided', async () => {
    await createTestBook('Awesome Book', 'Author1', 'Category1');
    await createTestBook('Another Great Book', 'Author1', 'Category2');
    await createTestBook('Fantastic Book', 'Author3', 'Category3');

    const response = await request(app).get('/api/books').query({ author: 'Author1' }).send({});

    expect(response.body.length).toEqual(2);
    expect(response.body.map((book: any) => book.author)).toContain('Author1');
});

it('returns default number of books per page if limit query parameter is not provided', async () => {
    await createTestBook('Book1', 'Author1', 'Category1');
    await createTestBook('Book2', 'Author2', 'Category2');
    await createTestBook('Book3', 'Author3', 'Category3');

    const response = await request(app).get('/api/books').query({ page: 1 }).send({});

    expect(response.body.length).toEqual(3); // Adjust based on default limit
});

it('returns correct books for specified page and limit', async () => {
    await createTestBook('Book1', 'Author1', 'Category1');
    await createTestBook('Book2', 'Author2', 'Category2');
    await createTestBook('Book3', 'Author3', 'Category3');
    await createTestBook('Book4', 'Author4', 'Category4');

    const response = await request(app).get('/api/books').query({ page: 2, limit: 2 }).send({});

    expect(response.body.length).toEqual(2);
    expect(response.body[0].title).toEqual('Book3');
    expect(response.body[1].title).toEqual('Book4');
});

it('returns empty array if page number is out of range', async () => {
    const response = await request(app).get('/api/books').query({ page: 100 }).send({});

    expect(response.body.length).toEqual(0);
});
