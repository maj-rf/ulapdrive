import { db } from './db';

// TODO: create & delete files

export async function getUserFiles(ownerId: number) {
  return await db.file.findMany({ where: { ownerId } });
}
