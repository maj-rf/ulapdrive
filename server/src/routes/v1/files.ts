import { Router } from 'express';
import * as filesController from '../../controllers/files.controller';

export const filesRouter = Router();

filesRouter.get('/', filesController.getFile);
