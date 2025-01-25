import { FormData, PublicUser } from '@/types/types';
import { API_URL } from './api';

export const register = async (user: FormData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    mode: 'cors',
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      email: user.email,
      displayName: user.displayName,
      password: user.password,
      confirmPassword: user.confirmPassword,
    }),
    headers: { 'Content-type': 'application/json' },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error); // this will parse the JSON response body
  }
  return data;
};

export const login = async (user: Partial<FormData>): Promise<PublicUser> => {
  const res = await fetch(`${API_URL}/auth/`, {
    mode: 'cors',
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
    headers: { 'Content-type': 'application/json' },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error); // this will parse the JSON response body
  }
  return data;
};

export const me = async (): Promise<PublicUser> => {
  const res = await fetch(`${API_URL}/auth/me`, {
    mode: 'cors',
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error); // this will parse the JSON response body
  }
  return data;
};

export const logout = async () => {
  const res = await fetch(`${API_URL}/auth/logout`, {
    mode: 'cors',
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error); // this will parse the JSON response body
  }
  return data.message;
};
