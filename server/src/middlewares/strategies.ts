import passport from 'passport';
import { Strategy } from 'passport-local';
import { db } from '../services/db';
import createHttpError from 'http-errors';
import * as argon2 from 'argon2';
import { PublicUser } from '../types/types';

passport.serializeUser((user, done) => {
  done(null, (user as PublicUser).id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await db.user.findFirst({ where: { id } });
    if (!user) return done(createHttpError(401, 'User not found.'), false);
    const { password: _pw, ...publicUser } = user;
    return done(null, publicUser);
  } catch (error) {
    return done(error);
  }
});

export default passport.use(
  new Strategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await db.user.findFirst({ where: { email } });
      // throw Error here so next() will point to errorHandler
      if (!user) return done(createHttpError(401, 'User not found.'), false);
      const passwordMatch = await argon2.verify(user.password, password);
      if (!passwordMatch)
        return done(
          createHttpError(401, 'Email or passord is incorrect'),
          false,
        );
      const { password: _pw, ...publicUser } = user;
      return done(null, publicUser);
    } catch (error) {
      return done(error);
    }
  }),
);
