import request from 'supertest';
import { app } from '../../../app';
import { getCookies } from '../../../utils/get-cookies';
import { Book } from '../../../models/book';

it('has a route handler listening to /api/books for post requests', async () => {
    const response = await request(app).post('/api/books').send({});
    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    await request(app).post('/api/books').send({}).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app).post('/api/books').set('Cookie', getCookies('admin@gmail.com')).send({});

    expect(response.status).not.toEqual(401);
});

it('returns a status other than 401 if the user does not have admin privilage', async () => {
    const response = await request(app).post('/api/books').set('Cookie', getCookies('admin@gmail.com')).send({});

    expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
    const cookie = await getCookies('admin@gmail.com');

    await request(app)
        .post('/api/books')
        .set('Cookie', cookie)
        .send({
            title: '',
            author: 'Author',
            price: 10,
            pages: 100,
            category: 'Fiction',
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);

    await request(app)
        .post('/api/books')
        .set('Cookie', cookie)
        .send({
            author: 'Author',
            price: 10,
            pages: 100,
            category: 'Fiction',
            imageUrl: 'http://example.com/image.jpg',
            quantity: 10,
        })
        .expect(400);
});

it('returns an error if an invalid author is provided', async () => {
    const cookie = await getCookies('admin@gmail.com');

    await request(app)
        .post('/api/books')
        .set('Cookie', cookie)
        .send({
            title: 'Title',
            author: '',
            price: 10,
            pages: 100,
            category: 'Fiction',
            imageUrl: 'http://example.com/image.jpg',
            quantity: 10,
        })
        .expect(400);

    await request(app)
        .post('/api/books')
        .set('Cookie', cookie)
        .send({
            title: 'Title',
            price: 10,
            pages: 100,
            category: 'Fiction',
            imageUrl: 'http://example.com/image.jpg',
            quantity: 10,
        })
        .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
    const cookie = await getCookies('admin@gmail.com');

    await request(app)
        .post('/api/books')
        .set('Cookie', cookie)
        .send({
            title: 'Title',
            author: 'Author',
            price: -10,
            pages: 100,
            category: 'Fiction',
            imageUrl: 'http://example.com/image.jpg',
            quantity: 10,
        })
        .expect(400);

    await request(app)
        .post('/api/books')
        .set('Cookie', cookie)
        .send({
            title: 'Title',
            author: 'Author',
            pages: 100,
            category: 'Fiction',
            quantity: 10,
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);
});

it('returns an error if an invalid pages is provided', async () => {
    const cookie = await getCookies('admin@gmail.com');

    await request(app)
        .post('/api/books')
        .set('Cookie', cookie)
        .send({
            title: 'Title',
            author: 'Author',
            price: 10,
            pages: -100,
            category: 'Fiction',
            imageUrl: 'http://example.com/image.jpg',
            quantity: 10,
        })
        .expect(400);

    await request(app)
        .post('/api/books')
        .set('Cookie', cookie)
        .send({
            title: 'Title',
            author: 'Author',
            price: 10,
            category: 'Fiction',
            imageUrl: 'http://example.com/image.jpg',
            quantity: 10,
        })
        .expect(400);
});

it('returns an error if an invalid category is provided', async () => {
    const cookie = await getCookies('admin@gmail.com');

    await request(app)
        .post('/api/books')
        .set('Cookie', cookie)
        .send({
            title: 'Title',
            author: 'Author',
            price: 10,
            pages: 100,
            category: '',
            imageUrl: 'http://example.com/image.jpg',
            quantity: 10,
        })
        .expect(400);

    await request(app)
        .post('/api/books')
        .set('Cookie', cookie)
        .send({
            title: 'Title',
            author: 'Author',
            price: 10,
            pages: 100,
            imageUrl: 'http://example.com/image.jpg',
            quantity: 10,
        })
        .expect(400);
});

it('returns an error if an invalid imageUrl is provided', async () => {
    const cookie = await getCookies('admin@gmail.com');

    await request(app)
        .post('/api/books')
        .set('Cookie', cookie)
        .send({
            title: 'Title',
            author: 'Author',
            price: 10,
            pages: 100,
            category: 'Fiction',
            imageUrl: '',
            quantity: 10,
        })
        .expect(400);

    await request(app)
        .post('/api/books')
        .set('Cookie', cookie)
        .send({
            title: 'Title',
            author: 'Author',
            price: 10,
            pages: 100,
            category: 'Fiction',
            quantity: 10,
        })
        .expect(400);
});

it('creates a book with valid inputs', async () => {
    const cookie = await getCookies('admin@gmail.com');
    let books = await Book.find({});
    expect(books.length).toEqual(0);

    const title = 'Valid Title';
    const author = 'Valid Author';
    const price = 20;
    const pages = 200;
    const category = 'Fiction';
    const imageUrl = 'http://example.com/image.jpg';
    const quantity = 10;

    const response = await request(app)
        .post('/api/books')
        .set('Cookie', cookie)
        .send({
            title,
            author,
            price,
            pages,
            category,
            imageUrl,
            quantity,
        })
        .expect(201);

    books = await Book.find({});

    expect(books.length).toEqual(1);
    expect(books[0].title).toEqual(title);
    expect(books[0].author).toEqual(author);
    expect(books[0].price).toEqual(price);
    expect(books[0].pages).toEqual(pages);
    expect(books[0].category).toEqual(category);
    expect(books[0].imageUrl).toEqual(imageUrl);
});
