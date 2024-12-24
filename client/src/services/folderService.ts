import { API_URL } from './api';
import type { Folder } from '@/types/types';

export const getRootFolders = async (): Promise<Folder[]> => {
  const res = await fetch(`${API_URL}/folders`, {
    mode: 'cors',
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error); // this will parse the JSON response body
  }
  return data;
};
