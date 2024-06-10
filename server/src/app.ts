import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';

import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middleware/error-handler';

import { signupRouter, signinRouter, signoutRouter } from './routes/auth';
import { createBookRouter } from './routes/book';
import { currentUser } from './middleware/current-user';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cors({
        origin: ['localhost'],
        credentials: process.env.NODE_ENV !== 'prod',
    })
);

app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
        // sameSite: 'none',
    })
);

app.use(currentUser);

// auth routes
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// book routes
app.use(createBookRouter);

// Not found hanlder
app.all('*', async () => {
    throw new NotFoundError();
});

// Error handler
app.use(errorHandler);

export { app };
