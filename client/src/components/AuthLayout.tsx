import { useMe } from '@/hooks/useMe';
import { Loading } from './Loading';
import { Navigate } from 'react-router';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useMe();

  if (isLoading) return <Loading />;
  if (data) return <Navigate to="/" />;
  return (
    <section className=" h-screen bg-gradient-to-tl from-gray-50 to-cyan-200 dark:from-gray-400 dark:to-cyan-700">
      <div className="flex flex-col items-center justify-center px-6 py-10 mx-auto md:h-full lg:py-0">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">☁️ulap☁️</h1>
        <div className="w-full">{children}</div>
      </div>
    </section>
  );
};
