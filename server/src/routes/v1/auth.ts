import { Router } from 'express';
import * as authController from '../../controllers/auth.controller';
import passport from 'passport';
import { isAuthenticated } from '../../middlewares/middlewares';
import { registerSchema, loginSchema } from '../../schemas/authSchemas';
import { validateData } from '../../middlewares/validate';

export const authRouter = Router();

authRouter.post(
  '/',
  validateData(loginSchema),
  passport.authenticate('local'),
  authController.login,
);
authRouter.post(
  '/register',
  validateData(registerSchema),
  authController.register,
);
authRouter.post('/logout', isAuthenticated, authController.logout);
authRouter.get('/me', isAuthenticated, authController.me);
