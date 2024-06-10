import request from 'supertest';
import { app } from '../../../app';
import { getCookies } from '../../../utils/get-cookies';
import { Book } from '../../../models/book';
import mongoose from 'mongoose';

it('has a route handler listening to /api/books/:id for delete requests', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const response = await request(app).delete(`/api/books/${id}`).send({});
    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is an admin', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app).delete(`/api/books/${id}`).send({}).expect(401);
});

it('returns a status other than 401 if the user is an admin', async () => {
    const cookie = await getCookies('admin@gmail.com');
    const id = new mongoose.Types.ObjectId().toHexString();
    const response = await request(app).delete(`/api/books/${id}`).set('Cookie', cookie).send({});
    expect(response.status).not.toEqual(401);
});

it('returns a 404 if the book does not exist', async () => {
    const cookie = await getCookies('admin@gmail.com');
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app).delete(`/api/books/${id}`).set('Cookie', cookie).send({}).expect(404);
});

it('deletes the book if it exists', async () => {
    const cookie = await getCookies('admin@gmail.com');
    const book = Book.build({
        title: 'title',
        author: 'author',
        price: 10,
        pages: 100,
        category: 'category',
        imageUrl: 'http://example.com/image.jpg',
    });
    await book.save();

    await request(app).delete(`/api/books/${book.id}`).set('Cookie', cookie).send({}).expect(200);

    const deletedBook = await Book.findById(book.id);
    expect(deletedBook).toBeNull();
});

it('returns the deleted book details if it exists', async () => {
    const cookie = await getCookies('admin@gmail.com');
    const book = Book.build({
        title: 'title',
        author: 'author',
        price: 10,
        pages: 100,
        category: 'category',
        imageUrl: 'http://example.com/image.jpg',
    });
    await book.save();

    const response = await request(app).delete(`/api/books/${book.id}`).set('Cookie', cookie).send({}).expect(200);

    expect(response.body.id).toEqual(book.id);
    expect(response.body.title).toEqual(book.title);
    expect(response.body.author).toEqual(book.author);
    expect(response.body.price).toEqual(book.price);
    expect(response.body.pages).toEqual(book.pages);
    expect(response.body.category).toEqual(book.category);
    expect(response.body.imageUrl).toEqual(book.imageUrl);
});
