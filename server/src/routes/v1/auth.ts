import { Router } from 'express';
import * as authController from '../../controllers/auth.controller';
import passport from 'passport';
import { isAuthenticated } from '../../middlewares/middlewares';

export const authRouter = Router();

authRouter.post('/', passport.authenticate('local'), authController.login);
authRouter.post('/register', authController.register);
authRouter.post('/logout', isAuthenticated, authController.logout);
authRouter.get('/me', isAuthenticated, authController.me);
