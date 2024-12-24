import { getRootFolders } from '@/services/folderService';
import { useQuery } from '@tanstack/react-query';
import { Loading } from './Loading';
import { NavLink } from 'react-router';
export const FolderSideBar = ({ userId }: { userId: number }) => {
  const { data, isPending, error } = useQuery({
    queryKey: ['folders', { userId }],
    queryFn: getRootFolders,
    throwOnError: true,
  });
  if (isPending) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h1>Folders</h1>
      {data.map((folder) => (
        <NavLink key={folder.id} to={`/${folder.id}`}>
          {folder.name}
        </NavLink>
      ))}
    </div>
  );
};
