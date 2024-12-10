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

export async function updateFolder(id: string, name: string) {
  return await db.folder.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}

export async function getRootFolders(ownerId: number) {
  return await db.folder.findMany({ where: { ownerId } });
}
