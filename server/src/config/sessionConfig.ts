import expressSession from 'express-session';
import { env } from '../config/config';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { db } from '../services/db';
import { RequestHandler } from 'express';

export const sessionHandler: RequestHandler = expressSession({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  },
  secret: env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(db, {
    checkPeriod: 2 * 60 * 1000, //ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
});
