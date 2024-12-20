import { Request, Response } from 'express';
import * as fileService from '../services/file.service';
import createHttpError from 'http-errors';
import { uploadToCloud } from '../utils/uploadUtil';

export const getFile = (req: Request, res: Response) => {
  console.log(req.user);
  res.send({ message: 'Hello from protected route' });
};

export const getFolderFiles = async (req: Request, res: Response) => {
  const ownerId = req.user?.id;
  const { folderId } = req.params;
  const files = await fileService.getUserFilesInFolder(
    folderId as string,
    Number(ownerId),
  );
  res.json(files);
};

export const addNewFile = async (req: Request, res: Response) => {
  const ownerId = req.user?.id;
  const { folderId } = req.params;
  const file = req.file;
  if (!file || !ownerId) {
    throw createHttpError(401, 'Invalid File or Unauthenticated');
  }

  const base64 = Buffer.from(file.buffer).toString('base64');
  const dataURI = `data:${file.mimetype};base64,${base64}`;
  const fileDetails = await uploadToCloud(dataURI, ownerId);

  // use resource_type to use the real file type of uploaded file.
  // users can change file extensions, cloudinary automatically detects the content
  const uploadedFile = await fileService.addFile(
    folderId as string,
    Number(ownerId),
    file.originalname,
    fileDetails.resource_type,
    fileDetails.bytes,
  );
  res.json(uploadedFile);
};

export const deleteFile = async (req: Request, res: Response) => {
  const ownerId = req.user?.id;
  const { folderId, id } = req.params;

  const file = await fileService.deleteFile(
    folderId as string,
    Number(ownerId),
    id as string,
  );
  res.json(file);
};
