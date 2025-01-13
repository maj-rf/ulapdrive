import { useParams, NavLink } from 'react-router';
import { ChevronRight, House } from 'lucide-react';
import { useSingleFolder } from '@/hooks/useFolder';
export const Breadcrumb = () => {
  const params = useParams();
  const { data } = useSingleFolder(params.folderId as string);

  return (
    <div className="inline-flex items-center gap-1">
      <NavLink to="/" className="inline-flex gap-1">
        <House />
        <span>Home </span>
      </NavLink>
      {!data ? (
        ''
      ) : (
        <>
          <span>
            <ChevronRight />
          </span>
          {data.name}
        </>
      )}
    </div>
  );
};
