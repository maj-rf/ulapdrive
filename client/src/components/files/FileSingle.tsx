import { useDeleteFile } from '@/hooks/useFile';
import type { File } from '@/types/types';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Loading } from '../Loading';
export const FileSingle = (props: File) => {
  const remove = useDeleteFile(props.folderId);

  const handleDelete = () => {
    remove.mutate({ folderId: props.folderId, id: props.id });
  };
  return (
    <div>
      <div>{props.name}</div>
      <div>{props.mimeType}</div>
      <Button
        onClick={handleDelete}
        disabled={remove.isPending}
        className="grid place-items-center"
      >
        <span className={cn('col-[1] row-[1]', remove.isPending ? 'invisible' : 'visible')}>
          Delete
        </span>
        <span
          aria-label="Deleting..."
          className={cn('col-[1] row-[1]', remove.isPending ? 'visible' : 'invisible')}
        >
          <Loading />
        </span>
      </Button>
    </div>
  );
};
