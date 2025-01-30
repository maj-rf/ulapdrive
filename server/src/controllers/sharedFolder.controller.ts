import { Request, Response } from 'express';
import * as sharedFolderService from '../services/sharedFolder.service';

export const createSharedFolderLink = async (req: Request, res: Response) => {
  const { expiresAt } = req.body;
  const { folderId } = req.params;
  const ownerId = req.user?.id;
  const folder = await sharedFolderService.createSharedFolder(
    folderId as string,
    Number(ownerId),
    expiresAt,
  );
  res.json(folder);
};

export const getAllUserShared = async (req: Request, res: Response) => {
  const ownerId = req.user?.id;
  const sharedFolders = await sharedFolderService.getAllUserSharedFolders(
    Number(ownerId),
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

export const removeSharedFolderLink = async (req: Request, res: Response) => {
  const { linkId } = req.params;
  const folder = await sharedFolderService.removeUserSharedFolderLink(
    linkId as string,
  );
  res.json(folder);
};
