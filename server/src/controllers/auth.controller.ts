import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import * as argon2 from 'argon2';
import * as userQueries from '../db/user.queries';
export const register = async (req: Request, res: Response) => {
  const { email, displayName, password } = req.body;
  const emailExists = await userQueries.findUserByEmail(email);
  if (emailExists) throw createHttpError(400, 'Email is already in use.');
  const passwordHash = await argon2.hash(password);
  const createdUser = await userQueries.createUser(
    email,
    displayName,
    passwordHash,
  );
  res.status(200).json({
    id: createdUser.id,
    displayName: createdUser.displayName,
    email: createdUser.email,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await userQueries.findUserByEmail(email);
  if (!user) throw createHttpError(401, 'User not found. Please register.');
  const passwordCorrect = user
    ? await argon2.verify(user.password, password)
    : false;
  if (!passwordCorrect) throw createHttpError(401, 'Incorrect password.');
  const { password: _pw, ...publicUser } = user;
  res.status(201).json(publicUser);
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.clearCookie('connect.sid');
  req.session.destroy(function (err) {
    if (err) return next(err);
  });
  res.json({ message: 'Success logout' });
};

export const me = (req: Request, res: Response) => {
  res.json(req.user);
};
