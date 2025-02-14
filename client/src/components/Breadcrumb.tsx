import { useParams, NavLink, useLocation } from 'react-router';
import { ChevronRight, FolderOpen, House } from 'lucide-react';
import { useSingleFolder } from '@/hooks/useFolder';
export const Breadcrumb = () => {
  const params = useParams();
  const u = useLocation();
  const { data } = useSingleFolder(params.folderId as string);
  if (u.pathname === '/') return null;

  return (
    <div className="inline-flex items-center gap-1">
      <NavLink to="/" className="inline-flex gap-1 items-center">
        <House size={20} strokeWidth="1.5" />
        <span>Home </span>
      </NavLink>
      {!data ? null : (
        <>
          <span>
            <ChevronRight />
          </span>
          <div className="inline-flex gap-1 items-center">
            <FolderOpen size={20} strokeWidth="1.5" />
            <span>{data.name}</span>
          </div>
        </>
      )}
    </div>
  );
};
