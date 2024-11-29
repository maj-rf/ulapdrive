import { FormData } from '@/types/types';
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
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  const data = await res.json();
  return data;
};

export const login = async (user: Partial<FormData>) => {
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
  if (!res.ok) {
    const error = await res.json();
    if (error) throw new Error(error.error);
  }
  const data = await res.json();
  return data;
};
