import { API_URL } from './api';
import type { File } from '@/types/types';

export const getFilesFromFolder = async (folderId: string): Promise<File[]> => {
  const res = await fetch(`${API_URL}/files/${folderId}`, {
    mode: 'cors',
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error); // this will parse the JSON response body
  }
  return data;
};
