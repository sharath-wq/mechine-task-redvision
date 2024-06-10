import request from 'supertest';
import { app } from '../../../app';
import { getCookies } from '../../../utils/get-cookies';
import { Book, BookDoc } from '../../../models/book';
import mongoose from 'mongoose';

it('has a route handler listening to /api/books/:id for put requests', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const response = await request(app).put(`/api/books/${id}`).send({});
    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is an admin', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app).put(`/api/books/${id}`).send({}).expect(401);
});

it('returns a status other than 401 if the user is an admin', async () => {
    const cookie = await getCookies('admin@gmail.com');
    const id = new mongoose.Types.ObjectId().toHexString();
    const response = await request(app).put(`/api/books/${id}`).set('Cookie', cookie).send({});
    expect(response.status).not.toEqual(401);
});

it('returns a 404 if the book does not exist', async () => {
    const cookie = await getCookies('admin@gmail.com');
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/books/${id}`)
        .set('Cookie', cookie)
        .send({
            title: 'title',
            author: 'author',
            price: 10,
            pages: 100,
            category: 'category',
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(404);
});

it('returns an error if an invalid title is provided', async () => {
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

    await request(app)
        .put(`/api/books/${book.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            author: 'author',
            price: 10,
            pages: 100,
            category: 'category',
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);

    await request(app)
        .put(`/api/books/${book.id}`)
        .set('Cookie', cookie)
        .send({
            author: 'author',
            price: 10,
            pages: 100,
            category: 'category',
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);
});

it('returns an error if an invalid author is provided', async () => {
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

    await request(app)
        .put(`/api/books/${book.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'title',
            author: '',
            price: 10,
            pages: 100,
            category: 'category',
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);

    await request(app)
        .put(`/api/books/${book.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'title',
            price: 10,
            pages: 100,
            category: 'category',
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
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

    await request(app)
        .put(`/api/books/${book.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'title',
            author: 'author',
            price: -10,
            pages: 100,
            category: 'category',
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);

    await request(app)
        .put(`/api/books/${book.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'title',
            author: 'author',
            pages: 100,
            category: 'category',
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);
});

it('returns an error if an invalid pages is provided', async () => {
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

    await request(app)
        .put(`/api/books/${book.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'title',
            author: 'author',
            price: 10,
            pages: -100,
            category: 'category',
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);

    await request(app)
        .put(`/api/books/${book.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'title',
            author: 'author',
            price: 10,
            category: 'category',
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);
});

it('returns an error if an invalid category is provided', async () => {
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

    await request(app)
        .put(`/api/books/${book.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'title',
            author: 'author',
            price: 10,
            pages: 100,
            category: '',
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);

    await request(app)
        .put(`/api/books/${book.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'title',
            author: 'author',
            price: 10,
            pages: 100,
            imageUrl: 'http://example.com/image.jpg',
        })
        .expect(400);
});

it('returns an error if an invalid imageUrl is provided', async () => {
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

    await request(app)
        .put(`/api/books/${book.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'title',
            author: 'author',
            price: 10,
            pages: 100,
            category: 'category',
            imageUrl: '',
        })
        .expect(400);

    await request(app)
        .put(`/api/books/${book.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'title',
            author: 'author',
            price: 10,
            pages: 100,
            category: 'category',
        })
        .expect(400);
});

it('updates the book with valid inputs', async () => {
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

    const newTitle = 'new title';
    const newAuthor = 'new author';
    const newPrice = 20;
    const newPages = 200;
    const newCategory = 'new category';
    const newImageUrl = 'http://example.com/new-image.jpg';

    await request(app)
        .put(`/api/books/${book.id}`)
        .set('Cookie', cookie)
        .send({
            title: newTitle,
            author: newAuthor,
            price: newPrice,
            pages: newPages,
            category: newCategory,
            imageUrl: newImageUrl,
        })
        .expect(200);

    const updatedBook = await Book.findById(book.id);

    expect(updatedBook).not.toBeNull();
    expect(updatedBook?.title).toEqual(newTitle);
    expect(updatedBook?.author).toEqual(newAuthor);
    expect(updatedBook?.price).toEqual(newPrice);
    expect(updatedBook?.pages).toEqual(newPages);
    expect(updatedBook?.category).toEqual(newCategory);
    expect(updatedBook?.imageUrl).toEqual(newImageUrl);
});
