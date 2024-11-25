import express from 'express';
import 'express-async-errors';
import { errorHandler } from './middlewares/middlewares';
import expressSession from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { db } from './db/db';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(db, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

app.get('/', (_req, res) => {
  res.json({ message: 'welcome to ulapdrive api' });
});

app.use(errorHandler);

export default app;
