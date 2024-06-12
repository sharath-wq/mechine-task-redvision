import request from 'supertest';
import { app } from '../../../app';
import { getCookies } from '../../../utils/get-cookies';

it('has a route handler listening to /api/orders for post requests', async () => {
    const response = await request(app).post('/api/orders').send({});
    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    await request(app).post('/api/orders').send({}).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app).post('/api/orders').set('Cookie', getCookies('user@gmail.com')).send({});
    expect(response.status).not.toEqual(401);
});

it('returns a 404 error if no cart is found for the user', async () => {
    const cookie = await getCookies('user@gmail.com');

    await request(app).post('/api/orders').set('Cookie', cookie).send({}).expect(404);
});
