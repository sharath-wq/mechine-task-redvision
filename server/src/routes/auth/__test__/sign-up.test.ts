import request from 'supertest';
import { app } from '../../../app';

it('returns a 400 with an invlaid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'asdfkaskf',
            name: 'testUser',
            password: 'password',
        })
        .expect(400);
});

it('returns a 400 with an invlaid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@gmail.com',
            name: 'testUser',
            password: 'p',
        })
        .expect(400);
});

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@gmail.com',
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'password',
        })
        .expect(400);
});

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            name: 'testUser',
            password: 'password',
        })
        .expect(201);
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            name: 'testUser',
            password: 'password',
        })
        .expect(400);
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            name: 'testUser',
            password: 'password',
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});

it('create a user with cart', async () => {
    const resposne = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            name: 'testUser',
            password: 'password',
        })
        .expect(201);

    expect(resposne.body.cartId).toBeDefined();
});

it('create a user with role admin for admin email', async () => {
    const resposne = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'admin@gmail.com',
            name: 'testUser',
            password: 'password',
        })
        .expect(201);

    expect(resposne.body.role).toEqual('admin');
});

it('create a user with role user for every other email', async () => {
    const resposne = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'user@gmail.com',
            name: 'testUser',
            password: 'password',
        })
        .expect(201);

    expect(resposne.body.role).toEqual('user');
});

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            name: 'testUser',
            password: 'password',
        })
        .expect(201);
});
