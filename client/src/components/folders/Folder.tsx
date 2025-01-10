import { NavLink, useNavigate, useLocation } from 'react-router';
import { Button } from '../ui/button';
import { useDeleteFolder } from '@/hooks/useFolder';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { EllipsisVertical } from 'lucide-react';
import { FolderUpdateForm } from './FolderUpdateForm';
import { useState } from 'react';
import { SidebarMenuButton } from '../ui/sidebar';

const FolderItem = ({
  id,
  name,
  children,
}: {
  id: string;
  name: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center w-full h-fit">
      <NavLink
        className={({ isActive }) =>
          isActive ? 'group-[.navlink-active]:text-red-300' : '' + 'w-full text-sm'
        }
        to={`/${id}`}
      >
        {name}
      </NavLink>
      <Popover>
        <PopoverTrigger asChild>
          <EllipsisVertical className="ml-auto" />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col p-0">{children}</PopoverContent>
      </Popover>
    </div>
  );
};

export const Folder = ({ id, name }: { id: string; name: string }) => {
  const remove = useDeleteFolder();
  const to = useNavigate();
  const l = useLocation();
  const [editing, setEditing] = useState(false);

  const handleDelete = (id: string) => {
    remove.mutate(id);
    // route to valid page if deleting a folder while in current folder url
    if (`/${id}` === l.pathname) {
      to('/');
    }
  };

  return (
    <>
      {editing ? (
        <FolderUpdateForm name={name} id={id} setEditing={setEditing} />
      ) : (
        <SidebarMenuButton variant="outline" className="group navlink-active">
          <FolderItem id={id} name={name}>
            <Button variant="ghost" onClick={() => handleDelete(id)}>
              Delete
            </Button>
            <Button variant="ghost" onClick={() => setEditing(true)}>
              Edit Name
            </Button>
          </FolderItem>
        </SidebarMenuButton>
      )}
    </>
  );
};
