import { db } from './db';

export async function createFolder(ownerId: number, name: string) {
  return await db.folder.create({
    data: {
      name,
      ownerId,
    },
  });
}

export async function deleteFolder(id: string) {
  return await db.folder.delete({
    where: {
      id,
    },
  });
}

export async function updateFolder(id: string, ownerId: number, name: string) {
  return await db.folder.update({
    where: {
      id,
      ownerId,
    },
    data: {
      name,
    },
  });
}

export async function getRootFolders(ownerId: number) {
  return await db.folder.findMany({ where: { ownerId } });
}

export async function getUserFolder(ownerId: number, id: string) {
  return await db.folder.findUnique({ where: { ownerId, id } });
}
