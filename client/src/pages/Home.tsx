import { Loading } from '@/components/Loading';
import { useMe } from '@/hooks/useMe';
import { Navigate, Outlet } from 'react-router';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useLogout';
import { FolderSideBar } from '@/components/folders/FolderSideBar';
import { ModeToggle } from '@/components/ModeToggle';
import { Header } from '@/components/Header';

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
      <Header>
        <h1>Hello, {data.displayName}</h1>
        <ModeToggle />
        <Button onClick={handleLogout}>Logout</Button>
      </Header>
      <div className="grid grid-cols-2">
        <FolderSideBar userId={data.id} />
        <Outlet />
      </div>
    </div>
  );
};
