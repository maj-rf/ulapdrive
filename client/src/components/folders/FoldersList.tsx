import { Folder } from './Folder';
import {
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from '../ui/sidebar';
import { useFolders } from '@/hooks/useFolder';
import { Plus } from 'lucide-react';
import { FolderCreateForm } from './FolderCreateForm';
import { useState } from 'react';

const FolderActionWithForm = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <SidebarGroupAction onClick={() => setShowForm((prev) => !prev)}>
        <Plus className={showForm ? 'rotate-45 transition-all' : 'rotate-0 transition-all'} />
      </SidebarGroupAction>
      {showForm ? <FolderCreateForm /> : null}
    </>
  );
};

const Folders = () => {
  const { data, isPending, error } = useFolders();
  if (isPending)
    return (
      <>
        {[1, 2, 3, 4, 5].map((n) => (
          <SidebarMenuSkeleton key={`skeleton-key-${n}`} />
        ))}
      </>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {/** TODO: put create folder form here */}
      <SidebarMenu>
        {data.map((folder) => (
          <SidebarMenuItem key={folder.id}>
            <Folder id={folder.id} name={folder.name} />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </>
  );
};

export const FoldersList = () => {
  return (
    <>
      <FolderActionWithForm />
      <Folders />
    </>
  );
};
