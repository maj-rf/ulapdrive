import { createCloudFolderForUser } from '../utils/uploadUtil';
import { db } from './db';

export async function createUser(
  email: string,
  displayName: string,
  password: string,
) {
  // create single user with a default folder then create a directory
  // to cloud for easier CRUD operations
  const createdUser = await db.user.create({
    data: {
      email,
      displayName,
      password,
      folders: {
        create: [{ name: 'Primary' }],
      },
    },
    // include: {
    //   folders: {
    //     select: { id: true },
    //     orderBy: {
    //       createdAt: 'desc',
    //     },
    //     take: 1,
    //   },
    // },
  });
  await createCloudFolderForUser(createdUser.id);
  return createdUser;
}

export async function findUserByEmail(email: string) {
  return await db.user.findFirst({ where: { email } });
}
