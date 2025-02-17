import { Router } from 'express';
import * as sharedFolderController from '../../controllers/sharedFolder.controller';
import { isAuthenticated } from '../../middlewares/middlewares';
export const sharedFolderRouter = Router();

sharedFolderRouter.get(
  '/folder/:folderId',
  isAuthenticated,
  sharedFolderController.getLink,
);
sharedFolderRouter.post(
  '/folder/:folderId',
  isAuthenticated,
  sharedFolderController.createLink,
);
sharedFolderRouter.delete(
  '/link/:linkId',
  isAuthenticated,
  sharedFolderController.removeLink,
);
sharedFolderRouter.delete(
  '/all',
  isAuthenticated,
  sharedFolderController.deleteAllExpiredLinks,
);

// public shared folder endpoint
sharedFolderRouter.get(
  '/link/:linkId',
  sharedFolderController.getFilesOfSharedFolder,
);
