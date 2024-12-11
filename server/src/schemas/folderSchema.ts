import { z } from 'zod';

export const folderSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Folder name is required.')
      .max(20, 'Maximum of 20 characters only'),
  }),
});
