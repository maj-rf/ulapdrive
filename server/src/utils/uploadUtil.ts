import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/config';

/**
 * When using multer.memoryStorage(), it stores the file
 * into a Buffer object which is a way to handle binary data
 * such as files.
 */

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUD_API_KEY,
  api_secret: env.CLOUD_API_SECRET,
});

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadToCloud = async (fileString: string, ownerId: number) => {
  const { uploader } = cloudinary;
  const res = await uploader.upload(fileString, {
    folder: `ulapdrive/${ownerId.toString()}`,
  });
  return res;
};

export const deleteFromCloud = async (url: string) => {
  const { uploader } = cloudinary;
  const parsedUrl = new URL(url);
  const pathComponents = parsedUrl.pathname.split('/');
  const lastSegment = pathComponents.at(-1) as string;
  const public_id = lastSegment.replace(/\.[^/.]+$/, '');
  const res = await uploader.destroy(public_id);
  return res;
};

export const createCloudFolderForUser = async (id: number) => {
  if (!id) return;
  await cloudinary.api.create_folder(`ulapdrive/${id.toString()}`);
  return;
};
