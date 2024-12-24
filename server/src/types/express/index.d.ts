import { UploadApiResponse } from 'cloudinary';
import { PublicUser } from '../types';

declare module 'express-serve-static-core' {
  interface Request {
    user?: PublicUser;
  }

  interface Locals {
    fileDetails?: UploadApiResponse;
  }
}
