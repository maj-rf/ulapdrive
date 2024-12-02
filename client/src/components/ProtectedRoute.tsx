import React from 'react';
import { useMe } from '@/hooks/useMe';
import { Navigate } from 'react-router';
import { Loading } from './Loading';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useMe();
  if (isLoading) return <Loading />;
  return data ? children : <Navigate to="/login" />;
};
