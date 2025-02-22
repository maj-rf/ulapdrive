import { uploadSchema } from './../../schemas/fileSchema';
import { Router } from 'express';
import * as filesController from '../../controllers/files.controller';
import { validateUpload } from '../../middlewares/validate';
import { limiter } from '../../middlewares/middlewares';
import { upload } from '../../utils/uploadUtil';
export const filesRouter = Router();

filesRouter.get('/', filesController.getFile);
filesRouter.get('/:folderId', filesController.getFolderFiles);

filesRouter.post(
  '/:folderId',
  limiter,
  upload.single('file_uploaded'),
  validateUpload(uploadSchema),
  filesController.addNewFile,
);

filesRouter.delete('/:folderId/:id', filesController.deleteFile);
