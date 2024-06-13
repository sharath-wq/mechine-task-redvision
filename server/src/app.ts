import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';

import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middleware/error-handler';
import { currentUser } from './middleware/current-user';

import { signupRouter, signinRouter, signoutRouter } from './routes/auth';
import {
    createBookRouter,
    updateBookRouter,
    deleteBookRouter,
    getAllBooksRouter,
    getOneBookRouter,
    getBookOptionsRouter,
} from './routes/book';
import { updateCartRouter, viewCartRouter } from './routes/cart';
import { createOrderRouter, viewOrdersRouter } from './routes/orders';

const corsOptions = {
    origin: true,
    credentials: true,
};

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cors(corsOptions));

// uncomment this on development envorment
// app.use(
//     cookieSession({
//         signed: false,
//         secure: false,
//         // sameSite: 'none',
//     })
// );

// on production
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
        sameSite: 'none',
    })
);

app.use(currentUser);

// auth routes
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// book routes
app.use(createBookRouter);
app.use(updateBookRouter);
app.use(deleteBookRouter);
app.use(getBookOptionsRouter);
app.use(getAllBooksRouter);
app.use(getOneBookRouter);

// cart routes
app.use(updateCartRouter);
app.use(viewCartRouter);

// order routes
app.use(createOrderRouter);
app.use(viewOrdersRouter);

// Not found hanlder
app.all('*', async () => {
    throw new NotFoundError();
});

// Error handler
app.use(errorHandler);

export { app };
