import { useQueryClient } from '@tanstack/react-query';
import type { Folder } from '@/types/types';
import { useParams, NavLink } from 'react-router';
import { ChevronRight, House } from 'lucide-react';
export const Breadcrumb = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const current = queryClient
    .getQueryData<Folder[]>(['folders'])
    ?.find((f) => f.id === (params.folderId as string));

  return (
    <div className="inline-flex items-center gap-1">
      <NavLink to="/" className="inline-flex gap-1">
        <House />
        <span>Home </span>
      </NavLink>
      {!current ? (
        ''
      ) : (
        <>
          <span>
            <ChevronRight />
          </span>
          {current.name}
        </>
      )}
    </div>
  );
};
