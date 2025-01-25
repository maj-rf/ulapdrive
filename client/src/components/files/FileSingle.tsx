import { useDeleteFile } from '@/hooks/useFile';
import type { File } from '@/types/types';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Loading } from '../Loading';
import { Download, Trash2 } from 'lucide-react';
export const FileSingle = (props: File) => {
  const remove = useDeleteFile(props.folderId);

  const handleDelete = () => {
    remove.mutate({ folderId: props.folderId, id: props.id });
  };
  return (
    <tr className="space-y-1">
      <td className="truncate text-left">{props.name}</td>
      <td className="truncate">{props.mimeType.split('/')[1]}</td>
      <td>{new Date(props.createdAt).toLocaleDateString()}</td>
      <td className="flex gap-2">
        <Button
          onClick={handleDelete}
          disabled={remove.isPending}
          className="grid place-items-center"
          variant="destructive"
          name="delete-button"
        >
          <span className={cn('col-[1] row-[1]', remove.isPending ? 'invisible' : 'visible')}>
            <div className="inline-flex gap-2 items-center">
              <span className="hidden lg:block">Delete</span>
              <Trash2 />
            </div>
          </span>
          <span
            aria-label="Deleting..."
            className={cn('col-[1] row-[1]', remove.isPending ? 'visible' : 'invisible')}
          >
            <Loading />
          </span>
        </Button>
        <Button asChild variant="secondary" name="download-button">
          <a href={props.url} download>
            <span className="hidden lg:block">Download</span>
            <Download />
          </a>
        </Button>
      </td>
    </tr>
  );
};
