import { RequestHandler } from 'express';
import * as folderService from '../services/folder.service';
export const getRootFolders: RequestHandler = async (req, res) => {
  const ownerId = req.user?.id;
  const folders = await folderService.getRootFolders(Number(ownerId));
  res.json(folders);
};

export const createUserFolder: RequestHandler = async (req, res) => {
  const { name } = req.body;
  const ownerId = req.user?.id;
  const folder = await folderService.createFolder(Number(ownerId), name);
  res.status(201).json(folder);
};

export const getUserFolder: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const ownerId = req.user?.id;
  const folder = await folderService.getUserFolder(
    Number(ownerId),
    id as string,
  );
  res.json(folder);
};

export const updateUserFolder: RequestHandler = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const ownerId = req.user?.id;
  const folder = await folderService.updateFolder(
    id as string,
    Number(ownerId),
    name,
  );
  res.json(folder);
};

export const deleteUserFolder: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const ownerId = req.user?.id;
  const folder = await folderService.deleteFolder(
    id as string,
    Number(ownerId),
  );
  res.json(folder);
};
