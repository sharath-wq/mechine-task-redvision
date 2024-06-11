import request from 'supertest';
import { app } from '../../../app';
import mongoose from 'mongoose';
import { getCookies } from '../../../utils/get-cookies';
import { Cart, CartItem } from '../../../models/cart';

const createTestBook = async (productId: mongoose.Types.ObjectId, quantity: number, price: number) => {
    const book = {
        productId,
        quantity,
        price,
    };
    return book;
};

const createTestCart = async (items: CartItem[], userId: mongoose.Types.ObjectId) => {
    const totalPrice = items.reduce((acc, curr) => acc + curr.price, 0);

    const cart = Cart.build({
        items,
        totalPrice,
        userId,
    });
    await cart.save();
    return cart;
};

it('has a route handler listening to /api/carts for put requests', async () => {
    const userId = new mongoose.Types.ObjectId();
    const cart = await createTestCart([], userId);
    const response = await request(app).put(`/api/cart`).send({});
    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is logged in', async () => {
    const userId = new mongoose.Types.ObjectId();

    const book1 = await createTestBook(new mongoose.Types.ObjectId(), 2, 100);
    const book2 = await createTestBook(new mongoose.Types.ObjectId(), 1, 50);

    const cart = await createTestCart([], userId);

    const response = await request(app)
        .put(`/api/cart`)
        .send({ items: [book1, book2] });

    expect(response.status).toEqual(401);
});

it('returns a 404 if the cart is not found', async () => {
    const userId = new mongoose.Types.ObjectId();
    const fakeCartId = new mongoose.Types.ObjectId();

    const cookie = await getCookies('testuser@example.com', userId.toHexString());

    const book1 = await createTestBook(new mongoose.Types.ObjectId(), 2, 100);
    const book2 = await createTestBook(new mongoose.Types.ObjectId(), 1, 50);

    const response = await request(app)
        .put(`/api/cart`)
        .set('Cookie', cookie)
        .send({
            items: [book1, book2],
        });
    expect(response.status).toEqual(404);
});

it('returns a 400 if the items are not provided', async () => {
    const userId = new mongoose.Types.ObjectId();
    const cart = await createTestCart([], userId);

    const cookie = await getCookies('testuser@example.com', userId.toHexString());

    const response = await request(app).put(`/api/cart`).set('Cookie', cookie).send({});
    expect(response.status).toEqual(400);
});

it('updates the cart with valid inputs', async () => {
    const userId = new mongoose.Types.ObjectId();
    const book1 = await createTestBook(new mongoose.Types.ObjectId(), 2, 100);
    const book2 = await createTestBook(new mongoose.Types.ObjectId(), 1, 50);

    const cart = await createTestCart([book1], userId);

    const cookie = await getCookies('testuser@example.com', userId.toHexString());

    const response = await request(app)
        .put(`/api/cart`)
        .set('Cookie', cookie)
        .send({
            items: [book2],
        });
    expect(response.status).toEqual(200);
    expect(response.body.items.length).toEqual(1);
    expect(response.body.items[0].productId).toEqual(book2.productId.toHexString());
    expect(response.body.totalPrice).toEqual(50);
});

it('returns the updated cart with new items', async () => {
    const userId = new mongoose.Types.ObjectId();
    const book1 = await createTestBook(new mongoose.Types.ObjectId(), 2, 100);
    const book2 = await createTestBook(new mongoose.Types.ObjectId(), 2, 100);

    const cart = await createTestCart([book1], userId);

    const cookie = await getCookies('testuser@example.com', userId.toHexString());

    const response = await request(app)
        .put(`/api/cart`)
        .set('Cookie', cookie)
        .send({
            items: [book1, book2],
        });

    expect(response.status).toEqual(200);
    expect(response.body.items.length).toEqual(2);
    expect(response.body.totalPrice).toEqual(400);
});
