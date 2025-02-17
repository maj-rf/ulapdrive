import { SharedFolder } from '@/types/types';
import { API_URL } from './api';

type ShareLink = {
  id: string;
  // userId: number;
  // folderId: string;
  expiresAt: Date;
};

export const createLink = async (obj: {
  folderId: string;
  expiresAt: number;
}): Promise<ShareLink> => {
  const res = await fetch(`${API_URL}/shared/folder/${obj.folderId}`, {
    mode: 'cors',
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({
      expiresAt: obj.expiresAt,
    }),
    headers: { 'Content-type': 'application/json' },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const removeLink = async (linkId: string): Promise<ShareLink> => {
  const res = await fetch(`${API_URL}/shared/link/${linkId}`, {
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

export const getLink = async (folderId: string): Promise<ShareLink> => {
  const res = await fetch(`${API_URL}/shared/folder/${folderId}`, {
    mode: 'cors',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const getPublicSharedFolder = async (linkId: string): Promise<SharedFolder> => {
  const res = await fetch(`${API_URL}/shared/link/${linkId}`, {
    mode: 'cors',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};
