import { NavLink } from 'react-router';
import { Button } from '../ui/button';
import { useFolderMutation } from '@/hooks/useFolderMutation';
import { FolderPopover } from './FolderPopover';
import { PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { EllipsisVertical } from 'lucide-react';
import { FolderUpdateForm } from './FolderUpdateForm';
import { useState } from 'react';
export const Folder = ({ id, name, userId }: { id: string; name: string; userId: number }) => {
  const { remove } = useFolderMutation(userId);
  const [editing, setEditing] = useState(false);
  return (
    <div className="flex items-center group">
      {editing ? (
        <FolderUpdateForm name={name} id={id} userId={userId} setEditing={setEditing} />
      ) : (
        <>
          <NavLink className="block" to={`/${id}`}>
            {name}
          </NavLink>
          <FolderPopover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVertical className="h-fit hidden group-hover:flex" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col p-0">
              <Button variant="ghost" onClick={() => remove.mutate(id)}>
                Delete
              </Button>
              <Button variant="ghost" onClick={() => setEditing(true)}>
                Edit Name
              </Button>
            </PopoverContent>
          </FolderPopover>
        </>
      )}
    </div>
  );
};
