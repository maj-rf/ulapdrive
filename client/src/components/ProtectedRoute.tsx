import React from 'react';
import { useMe } from '@/hooks/useMe';
import { Navigate } from 'react-router';
import { Loading } from './Loading';
import { toast } from 'sonner';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, error } = useMe();
  if (isLoading) return <Loading />;
  // redirect to login if session is expired and show error message
  if (error) {
    toast.error(error.message);
    return <Navigate to="/login" />;
  }
  return data ? children : <Navigate to="/login" />;
};
