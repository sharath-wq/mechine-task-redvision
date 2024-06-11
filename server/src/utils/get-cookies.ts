import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const getCookies = (email = 'test@gmail.com', id = new mongoose.Types.ObjectId().toHexString()) => {
    // Build a JWT payload. {id, email}
    const payload = {
        id: id,
        email: email,
        role: email === 'admin@gmail.com' ? 'admin' : 'user',
    };
    // Create the JWT!
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build Session object.
    const session = { jwt: token };

    // Truen that session into JSON
    const sessionJSON = JSON.stringify(session);
    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string thats the cookie with the encoded data
    return [`session=${base64}`];
};

export { getCookies };
