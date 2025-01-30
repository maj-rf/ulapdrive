import { db } from './db';

export async function getFilesOfValidSharedFolder(linkId: string) {
  const sharedFolder = await db.sharedFolder.findUnique({
    where: { id: linkId },
    select: {
      id: true,
      expiresAt: true,
      owner: {
        select: {
          displayName: true,
        },
      },
      folder: {
        select: {
          name: true,
          files: {
            select: {
              id: true,
              mimeType: true,
              createdAt: true,
              size: true,
              url: true,
            },
          },
        },
      },
    },
  });
  if (!sharedFolder) {
    return;
  }
  if (sharedFolder.expiresAt < new Date()) {
    throw new Error('expired');
  }
  return sharedFolder;
}

export async function getAllUserSharedFolders(ownerId: number) {
  return await db.sharedFolder.findMany({ where: { userId: ownerId } });
}

export async function createSharedFolder(
  folderId: string,
  ownerId: number,
  expiresAt: string,
) {
  const current = new Date();
  const expiration = current.setDate(current.getDate() + Number(expiresAt));
  return await db.sharedFolder.create({
    data: {
      folderId,
      userId: ownerId,
      expiresAt: new Date(expiration),
    },
  });
}

export async function deleteUserSharedFolders(ownerId: number) {
  return await db.sharedFolder.deleteMany({
    where: {
      userId: ownerId,
    },
  });
}

export async function removeUserSharedFolderLink(linkId: string) {
  return await db.sharedFolder.delete({
    where: {
      id: linkId,
    },
  });
}

export async function deleteExpiredUserSharedFolders(ownerId: number) {
  return await db.sharedFolder.deleteMany({
    where: {
      userId: ownerId,
      expiresAt: {
        lt: new Date(),
      },
    },
  });
}
