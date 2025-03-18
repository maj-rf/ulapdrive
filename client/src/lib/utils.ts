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

export const timeSince = (date: Date) => {
  const d = new Date();
  const seconds = Math.floor((d.getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + 'y';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + 'mo';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + 'd';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + 'h';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + 'min';
  }
  return Math.floor(seconds) + 's';
};

export const calculateFileSize = (size: number) => {
  if (size <= 1000) {
    return `${size}bytes`;
  }
  if (size <= 10000) {
    return `${(size / 1000).toFixed(2)}KB`;
  }
  if (size <= 500000) {
    return `${(size / 1000).toFixed(0)}KB`;
  }
  return `${(size / 1000000).toFixed(2)}MB`;
};
