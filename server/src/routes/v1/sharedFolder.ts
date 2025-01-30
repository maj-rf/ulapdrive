import { Router } from 'express';
import * as sharedFolderController from '../../controllers/sharedFolder.controller';
import { isAuthenticated } from '../../middlewares/middlewares';
export const sharedFolderRouter = Router();

sharedFolderRouter.get(
  '/',
  isAuthenticated,
  sharedFolderController.getAllUserShared,
);
sharedFolderRouter.post(
  '/:folderId',
  isAuthenticated,
  sharedFolderController.createSharedFolderLink,
);
sharedFolderRouter.delete(
  '/:linkId',
  isAuthenticated,
  sharedFolderController.removeSharedFolderLink,
);

// public shared folder endpoint
sharedFolderRouter.get(
  '/:linkId',
  sharedFolderController.getFilesOfSharedFolder,
);
