import { Router } from 'express';
import * as folderController from '../../controllers/folder.controller';
import { validateData } from '../../middlewares/validate';
import { folderSchema } from '../../schemas/folderSchema';
export const folderRouter = Router();

folderRouter.get('/', folderController.getRootFolders);
folderRouter.post(
  '/',
  validateData(folderSchema),
  folderController.createUserFolder,
);
folderRouter.patch(
  '/:id',
  validateData(folderSchema),
  folderController.updateUserFolder,
);
