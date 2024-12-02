import { Loading } from '@/components/Loading';
import { useMe } from '@/hooks/useMe';
import { Navigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useLogout';

export const Home = () => {
  const { data, isLoading } = useMe();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };
  if (isLoading) return <Loading />;
  if (!data) return <Navigate to="/login" />;
  return (
    <div>
      <h1>Hello, {data.displayName}</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};
