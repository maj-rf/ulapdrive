import { db } from './db';

export async function getUserFiles(ownerId: number) {
  return await db.file.findMany({ where: { ownerId } });
}

export async function getUserFilesInFolder(folderId: string, ownerId: number) {
  return await db.file.findMany({
    where: {
      ownerId,
      folderId,
    },
  });
}

export async function addFile(
  folderId: string,
  ownerId: number,
  name: string,
  mimeType: string,
  size: number,
  url: string,
) {
  return await db.file.create({
    data: {
      folderId,
      ownerId,
      name,
      mimeType,
      size,
      url,
    },
  });
}

export async function deleteFile(
  folderId: string,
  ownerId: number,
  fileId: string,
) {
  return await db.file.delete({
    where: {
      ownerId,
      folderId,
      id: fileId,
    },
  });
}
