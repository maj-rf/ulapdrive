import { Folder } from './Folder';
import {
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from '../ui/sidebar';
import { useFolders } from '@/hooks/useFolder';
import { Plus } from 'lucide-react';

export const FoldersList = () => {
  const { data, isPending, error } = useFolders();
  if (isPending)
    return (
      <>
        <SidebarMenuSkeleton />
        <SidebarMenuSkeleton />
        <SidebarMenuSkeleton />
      </>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {/** TODO: put create folder form here */}
      <SidebarGroupAction>
        <Plus />
      </SidebarGroupAction>
      <SidebarMenu>
        {data.map((folder) => (
          <SidebarMenuItem key={folder.id} className="">
            <Folder id={folder.id} name={folder.name} />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </>
  );
};
