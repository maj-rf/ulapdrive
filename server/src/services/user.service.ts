import { db } from './db';

export async function createUser(
  email: string,
  displayName: string,
  password: string,
) {
  return await db.user.create({
    data: {
      email,
      displayName,
      password,
    },
  });
}

export async function findUserByEmail(email: string) {
  return await db.user.findFirst({ where: { email } });
}
