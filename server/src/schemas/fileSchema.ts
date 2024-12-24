import z from 'zod';
const fileSchema = z.custom<Express.Multer.File>();

const validMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/msword',
  'application/pdf',
  'text/plain',
  'application/zip',
  'image/jpg',
];

export const uploadSchema = z.object({
  file: fileSchema
    .refine(
      (file: Express.Multer.File) => file.size > 0 && file.size < 2 ** 22,
      'File size must be between 0 to 4MB',
    )
    .refine(
      (file: Express.Multer.File) =>
        !file || validMimeTypes.includes(file.mimetype),
      'Allowed types: jpeg, jpg, png, pdf, txt, zip, doc',
    ),
});
