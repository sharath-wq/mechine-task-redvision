import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middleware/error-handler';

// import { currentuserRouter } from './routes/auth/current-user';
import { signinRouter } from './routes/auth/sign-in';
// import { signoutRouter } from './routes/auth/sign-out';
import { signupRouter } from './routes/auth/sign-up';
// import { NotFoundError } from './errors/not-found-error';
// import { errorHandler } from './middleware/error-handler';
// import { savePasswordRotuer } from './routes/password/save-password';
// import { getPasswordsRouter } from './routes/password/get-passwords';
// import { updatePasswordRouter } from './routes/password/update-password';
// import { deletePasswordRouter } from './routes/password/delete-password';

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
        sameSite: 'none',
    })
);

// auth routes
// app.use(currentuserRouter);
app.use(signinRouter);
// app.use(signoutRouter);
app.use(signupRouter);

// password routes
// app.use(savePasswordRotuer);
// app.use(getPasswordsRouter);
// app.use(updatePasswordRouter);
// app.use(deletePasswordRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
