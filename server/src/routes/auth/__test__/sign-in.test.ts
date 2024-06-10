import request from 'supertest';
import { app } from '../../../app';

it('fails when a email that does not exist is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            displayName: 'testUser',
            password: 'password',
        })
        .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            displayName: 'testUser',
            password: 'password',
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@gmail.com',
            displayName: 'testUser',
            password: 'passed123',
        })
        .expect(400);
});

it('response with a token when given valid credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            displayName: 'testUser',
            password: 'password',
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            displayName: 'testUser',
            password: 'password',
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns a user with role admin for admin email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'admin@gmail.com',
            displayName: 'testUser',
            password: 'password',
        })
        .expect(201);

    const resposne = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'admin@gmail.com',
            displayName: 'testUser',
            password: 'password',
        })
        .expect(200);

    expect(resposne.body.role).toEqual('admin');
});

it('returns a user with role user for every other email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'user@gmail.com',
            displayName: 'testUser',
            password: 'password',
        })
        .expect(201);

    const resposne = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'user@gmail.com',
            displayName: 'testUser',
            password: 'password',
        })
        .expect(200);

    expect(resposne.body.role).toEqual('user');
});
