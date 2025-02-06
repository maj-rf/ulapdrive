import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateExpiration = (date: Date) => {
  const current = new Date();
  const expiration = new Date(date);
  const diffMS = expiration.getTime() - current.getTime();
  const diffDays = Math.floor(diffMS / 86400000);
  const diffHours = Math.floor(24 - Math.ceil((diffMS / 86400000 / 360) * 24));
  return `${diffDays}d${diffHours}h`;
};
