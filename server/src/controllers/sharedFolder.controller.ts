import { Request, Response } from 'express';
import * as sharedFolderService from '../services/sharedFolder.service';

export const createLink = async (req: Request, res: Response) => {
  const { expiresAt } = req.body;
  const { folderId } = req.params;
  const ownerId = req.user?.id;
  const folder = await sharedFolderService.createLink(
    folderId as string,
    Number(ownerId),
    expiresAt,
  );
  res.json(folder);
};

export const getLink = async (req: Request, res: Response) => {
  const ownerId = req.user?.id;
  const { folderId } = req.params;
  const sharedFolders = await sharedFolderService.getLink(
    Number(ownerId),
    folderId as string,
  );
  res.json(sharedFolders);
};

export const getFilesOfSharedFolder = async (req: Request, res: Response) => {
  const { linkId } = req.params;
  const files = await sharedFolderService.getFilesOfValidSharedFolder(
    linkId as string,
  );
  res.json(files);
};

export const removeLink = async (req: Request, res: Response) => {
  const { linkId } = req.params;
  const folder = await sharedFolderService.removeLink(linkId as string);
  res.json(folder);
};

export const deleteAllExpiredLinks = async (req: Request, res: Response) => {
  await sharedFolderService.deleteAllExpiredLinks();
  res.json({ message: 'Deleted all folders' });
};
