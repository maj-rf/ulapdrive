import { NavLink, useNavigate, useLocation } from 'react-router';
import { Button } from '../ui/button';
import { useDeleteFolder } from '@/hooks/useFolder';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { EllipsisVertical } from 'lucide-react';
import { FolderUpdateForm } from './FolderUpdateForm';
import { useState } from 'react';
import { SidebarMenuButton, SidebarMenuAction } from '../ui/sidebar';
import { Loading } from '../Loading';

const FolderItem = ({ id, name }: { id: string; name: string }) => {
  return (
    <NavLink to={`/${id}`} className="w-full">
      <span>{name}</span>
    </NavLink>
  );
};

export const Folder = ({ id, name }: { id: string; name: string }) => {
  const remove = useDeleteFolder();
  const to = useNavigate();
  const l = useLocation();
  const [editing, setEditing] = useState(false);

  const handleDelete = async (id: string) => {
    const folder = await remove.mutateAsync(id);
    // route to valid page if deleting a folder while in current folder url
    if (folder && `/${id}` === l.pathname) {
      to('/');
    }
  };

  return (
    <>
      {editing ? (
        <FolderUpdateForm name={name} id={id} setEditing={setEditing} />
      ) : (
        <>
          <SidebarMenuButton asChild>
            <div className="has-[:first-child.active]:bg-background">
              <FolderItem id={id} name={name} />
            </div>
          </SidebarMenuButton>
          <Popover>
            <PopoverTrigger asChild>
              <SidebarMenuAction>
                <EllipsisVertical />
                <span className="sr-only">Open Folder Options</span>
              </SidebarMenuAction>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col items-center p-0">
              {remove.isPending ? (
                <Loading />
              ) : (
                <>
                  <Button variant="ghost" className="w-full" onClick={() => handleDelete(id)}>
                    Delete
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={() => setEditing(true)}>
                    Edit Name
                  </Button>
                </>
              )}
            </PopoverContent>
          </Popover>
        </>
      )}
    </>
  );
};
