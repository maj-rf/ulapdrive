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

export const uploadFileToFolder = async ({
  obj,
  folderId,
}: {
  obj: FormData;
  folderId: string;
}): Promise<File[]> => {
  const res = await fetch(`${API_URL}/files/${folderId}`, {
    mode: 'cors',
    credentials: 'include',
    method: 'POST',
    body: obj,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error); // api returns an error message
  }
  return data;
};

export const deleteFileFromFolder = async ({ folderId, id }: Partial<File>): Promise<File> => {
  const res = await fetch(`${API_URL}/files/${folderId}/${id}`, {
    mode: 'cors',
    credentials: 'include',
    method: 'DELETE',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};
