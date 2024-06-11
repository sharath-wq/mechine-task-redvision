import request from 'supertest';
import { app } from '../../../app';
import mongoose from 'mongoose';
import { getCookies } from '../../../utils/get-cookies';
import { Cart, CartItem } from '../../../models/cart';

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

it('has a route handler listening to /api/cart for get requests', async () => {
    const response = await request(app).get('/api/cart').send({});
    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is logged in', async () => {
    const response = await request(app).get('/api/cart').send({});
    expect(response.status).toEqual(401);
});

it('returns a 404 if the cart is not found', async () => {
    const userId = new mongoose.Types.ObjectId();
    const cookie = await getCookies('testuser@example.com', userId.toHexString());

    const response = await request(app).get('/api/cart').set('Cookie', cookie).send({});
    expect(response.status).toEqual(404);
});

it('returns the cart for the logged in user', async () => {
    const userId = new mongoose.Types.ObjectId();
    const book1 = {
        productId: new mongoose.Types.ObjectId(),
        quantity: 2,
        price: 100,
    };
    const book2 = {
        productId: new mongoose.Types.ObjectId(),
        quantity: 1,
        price: 50,
    };

    await createTestCart([book1, book2], userId);

    const cookie = await getCookies('testuser@example.com', userId.toHexString());

    const response = await request(app).get('/api/cart').set('Cookie', cookie).send({});

    expect(response.status).toEqual(200);
    expect(response.body.items.length).toEqual(2);
    expect(response.body.totalPrice).toEqual(250);
    expect(response.body.userId).toEqual(userId.toHexString());
});
