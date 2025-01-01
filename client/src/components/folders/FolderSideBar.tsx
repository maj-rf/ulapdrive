import { getRootFolders } from '@/services/folderService';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../Loading';
import { FolderCreateForm } from './FolderCreateForm';
import { Folder } from './Folder';
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
      <FolderCreateForm userId={userId} />
      {data.map((folder) => (
        <Folder key={folder.id} id={folder.id} name={folder.name} userId={userId} />
      ))}
    </div>
  );
};
