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
    resource_type: 'auto',
  });
  const url = cloudinary.utils.url(res.public_id, {
    flags: 'attachment',
    resource_type: res.resource_type,
  });
  return url;
};

export const deleteFromCloud = async (url: string) => {
  const { uploader } = cloudinary;
  const parsedUrl = new URL(url);
  console.log(parsedUrl);
  const pathComponents = parsedUrl.pathname.split('/');
  const resourceType = pathComponents[2];
  console.log(resourceType);
  const lastSegment = pathComponents.slice(-3).join('/');
  const public_id = lastSegment.replace(/\.[^/.]+$/, '');
  const res = await uploader.destroy(public_id, {
    resource_type: resourceType,
  });
  return res;
};

export const createCloudFolderForUser = async (id: number) => {
  if (!id) return;
  await cloudinary.api.create_folder(`ulapdrive/${id.toString()}`);
  return;
};
