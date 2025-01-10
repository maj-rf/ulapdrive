import { Loading } from '../Loading';
import { Folder } from './Folder';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem } from '../ui/sidebar';
import { useGetFolder } from '@/hooks/useFolder';

export const FoldersList = () => {
  const { data, isPending, error } = useGetFolder();
  if (isPending) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Folders</SidebarGroupLabel>
      <SidebarMenu>
        {data.map((folder) => (
          <SidebarMenuItem key={folder.id}>
            <Folder id={folder.id} name={folder.name} />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
