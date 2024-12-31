import { NavLink } from 'react-router';
import { Button } from '../ui/button';
import { MinusCircle } from 'lucide-react';
import { useFolderMutation } from '@/hooks/useFolderMutation';
export const Folder = ({ id, name }: { id: string; name: string }) => {
  const remove = useFolderMutation().remove;

  return (
    <div>
      <NavLink className="block" to={`/${id}`}>
        {name}
      </NavLink>
      <Button onClick={() => remove.mutate(id)}>
        <MinusCircle />
      </Button>
    </div>
  );
};
