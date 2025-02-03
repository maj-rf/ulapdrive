import createHttpError from 'http-errors';
import { db } from './db';

// create link
export async function createLink(
  folderId: string,
  ownerId: number,
  expiresAt: string,
) {
  const current = new Date();
  const expiration = new Date().setDate(current.getDate() + Number(expiresAt));
  // check if an unexpired folder link exists first, return if true
  // else, return a newly created link
  const existing = await db.sharedFolder.findFirst({
    where: {
      folderId,
      userId: ownerId,
      expiresAt: {
        gte: current,
      },
    },
    select: {
      id: true,
      expiresAt: true,
    },
  });
  if (existing) return existing;

  return await db.sharedFolder.create({
    data: {
      folderId,
      userId: ownerId,
      expiresAt: new Date(expiration),
    },
    select: {
      id: true,
      expiresAt: true,
    },
  });
}
// remove link
export async function removeLink(linkId: string) {
  return await db.sharedFolder.delete({
    where: {
      id: linkId,
    },
    select: {
      id: true,
      expiresAt: true,
    },
  });
}

// get link
export async function getLink(ownerId: number, folderId: string) {
  return await db.sharedFolder.findFirst({
    where: {
      userId: ownerId,
      folderId,
      expiresAt: {
        gte: new Date(),
      },
    },
  });
}

// get content of link
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
              name: true,
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
    throw createHttpError(404, 'Shared folder cannot be found');
  }
  if (sharedFolder.expiresAt < new Date()) {
    throw createHttpError(404, 'Link expired');
  }
  return sharedFolder;
}

export async function deleteAllExpiredLinks() {
  return await db.sharedFolder.deleteMany({
    where: {
      expiresAt: {
        lte: new Date(),
      },
    },
  });
}
