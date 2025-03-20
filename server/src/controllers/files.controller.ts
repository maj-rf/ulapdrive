import { Request, Response } from 'express';
import * as fileService from '../services/file.service';
import createHttpError from 'http-errors';
import { deleteFromCloud, uploadToCloud } from '../utils/uploadUtil';
import { getUserFolder } from '../services/folder.service';

export const getFile = (req: Request, res: Response) => {
  console.log(req.user);
  res.send({ message: 'Hello from protected route' });
};

export const getFolderFiles = async (req: Request, res: Response) => {
  const ownerId = req.user?.id;
  const { folderId } = req.params;
  const folder = await getUserFolder(Number(ownerId), folderId as string);
  if (!folder) throw createHttpError(404, 'Folder not found');
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
  const url = await uploadToCloud(
    dataURI,
    ownerId,
    folderId as string,
    file.originalname.split('.')[0]!,
  );

  const uploadedFile = await fileService.addFile(
    folderId as string,
    Number(ownerId),
    file.originalname,
    file.mimetype,
    file.size,
    url,
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
  await deleteFromCloud(file.url);
  res.json(file);
};
