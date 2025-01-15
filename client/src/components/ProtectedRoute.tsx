import React from 'react';
import { useMe } from '@/hooks/useAuth';
import { Navigate } from 'react-router';
import { Loading } from './Loading';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isPending, error } = useMe();
  if (isPending)
    return (
      <section className="h-screen grid place-items-center">
        <Loading />
      </section>
    );
  if (error) {
    return <Navigate to="/auth" />;
  }
  return data ? children : <Navigate to="/auth" />;
};
