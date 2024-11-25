import { Router } from 'express';
import * as authController from '../../controllers/auth.controller';
import passport from 'passport';

export const authRouter = Router();

authRouter.post('/', passport.authenticate('local'), authController.login);
authRouter.post('/register', authController.register);
