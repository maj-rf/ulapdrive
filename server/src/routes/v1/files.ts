import { uploadSchema } from './../../schemas/fileSchema';
import { Router } from 'express';
import * as filesController from '../../controllers/files.controller';
import { validateUpload } from '../../middlewares/validate';
import { upload } from '../../utils/uploadUtil';
export const filesRouter = Router();

filesRouter.get('/', filesController.getFile);
filesRouter.get('/:folderId', filesController.getFolderFiles);

filesRouter.post(
  '/:folderId',
  upload.single('file_uploaded'),
  validateUpload(uploadSchema),
  filesController.addNewFile,
);

filesRouter.delete('/:folderId/:id', filesController.deleteFile);
