import request from 'supertest';
import { app } from '../../../app';
import mongoose from 'mongoose';
import { getCookies } from '../../../utils/get-cookies';
import { Order, OrderItem } from '../../../models/orders';

const createTestOrder = async (items: OrderItem[], userId: mongoose.Types.ObjectId) => {
    const totalPrice = items.reduce((acc, curr) => acc + curr.price, 0);

    const order = Order.build({
        items,
        totalPrice,
        userId,
    });
    await order.save();
    return order;
};

it('has a route handler listening to /api/orders for get requests', async () => {
    const response = await request(app).get('/api/orders').send({});
    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is logged in', async () => {
    const response = await request(app).get('/api/orders').send({});
    expect(response.status).toEqual(401);
});

it('returns an empty list if no orders are found for the user', async () => {
    const userId = new mongoose.Types.ObjectId();
    const cookie = await getCookies('testuser@example.com', userId.toHexString());

    const response = await request(app).get('/api/orders').set('Cookie', cookie).send({});
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(0);
});

it('returns the orders for the logged in user', async () => {
    const userId = new mongoose.Types.ObjectId();
    const orderItem1 = {
        productId: new mongoose.Types.ObjectId(),
        quantity: 2,
        price: 100,
    };
    const orderItem2 = {
        productId: new mongoose.Types.ObjectId(),
        quantity: 1,
        price: 50,
    };

    await createTestOrder([orderItem1, orderItem2], userId);

    const cookie = await getCookies('testuser@example.com', userId.toHexString());

    const response = await request(app).get('/api/orders').set('Cookie', cookie).send({});

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].items.length).toEqual(2);
    expect(response.body[0].userId).toEqual(userId.toHexString());
});
