import { getRootFolders } from '@/services/folderService';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../Loading';
import { FolderCreateForm } from './FolderCreateForm';
import { Folder } from './Folder';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '../ui/sidebar';
export const FolderSideBar = ({ userId }: { userId: number }) => {
  const { data, isPending, error } = useQuery({
    queryKey: ['folders', { userId }],
    queryFn: getRootFolders,
    throwOnError: true,
  });
  if (isPending) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Folders</SidebarGroupLabel>
      <FolderCreateForm userId={userId} />
      <SidebarMenu className="mt-2">
        {data.map((folder) => (
          <SidebarMenuItem key={folder.id}>
            <SidebarMenuButton variant="outline">
              <Folder id={folder.id} name={folder.name} userId={userId} />
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
