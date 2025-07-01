import { useMe } from '@/hooks/useAuth';
import { Loading } from './Loading';
import { Navigate, Outlet } from 'react-router';

export const AuthLayout = () => {
  const { data, isPending } = useMe();

  if (isPending)
    return (
      <section className="h-screen grid place-items-center">
        <Loading />
      </section>
    );
  if (data) return <Navigate to="/" />;
  return (
    <section className="h-screen bg-cover bg-[url(tvr-cloud.webp)] bg-blend-multiply">
      <div className="flex flex-col items-center justify-center mx-auto h-full">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </section>
  );
};
