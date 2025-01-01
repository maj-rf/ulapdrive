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

export const createFolder = async (name: string): Promise<Folder[]> => {
  const res = await fetch(`${API_URL}/folders`, {
    mode: 'cors',
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({
      name,
    }),
    headers: { 'Content-type': 'application/json' },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const deleteFolder = async (folderId: string): Promise<Folder[]> => {
  const res = await fetch(`${API_URL}/folders/${folderId}`, {
    mode: 'cors',
    credentials: 'include',
    method: 'DELETE',
    headers: { 'Content-type': 'application/json' },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const updateFolderName = async ({
  name,
  folderId,
}: {
  name: string;
  folderId: string;
}): Promise<Folder> => {
  const res = await fetch(`${API_URL}/folders/${folderId}`, {
    mode: 'cors',
    credentials: 'include',
    method: 'PATCH',
    body: JSON.stringify({
      name,
    }),
    headers: { 'Content-type': 'application/json' },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};
