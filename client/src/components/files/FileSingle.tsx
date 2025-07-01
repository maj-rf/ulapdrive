import { useDeleteFile } from '@/hooks/useFile';
import type { File } from '@/types/types';
import { Button } from '../ui/button';
import { calculateFileSize, cn, timeSince } from '@/lib/utils';
import { Loading } from '../Loading';
import { Download, Trash2 } from 'lucide-react';
import { IconType } from './IconType';

export const FileSingle = (props: File) => {
  const remove = useDeleteFile(props.folderId);

  const handleDelete = () => {
    remove.mutate({ folderId: props.folderId, id: props.id });
  };

  return (
    <tr className="space-y-1">
      <td headers="Filename">
        <div className="flex gap-1">
          <span>
            <IconType fileType={props.mimeType} />
          </span>
          <p className="flex-1 sm:truncate sm:w-20">{props.name}</p>
        </div>
      </td>
      <td headers="Filesize" className="flex gap-1">
        <p>{calculateFileSize(props.size)}</p>
      </td>
      <td headers="Uploaded"> {timeSince(new Date(props.createdAt))} ago</td>
      <td className="flex gap-2" headers="Actions">
        <Button
          onClick={handleDelete}
          disabled={remove.isPending}
          className="grid place-items-center"
          variant="destructive"
          name="delete-button"
        >
          <span className={cn('col-[1] row-[1]', remove.isPending ? 'invisible' : 'visible')}>
            <div className="inline-flex gap-2 items-center">
              <span className="sm:hidden lg:block">Delete</span>
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
            <span className="sm:hidden lg:block">Download</span>
            <Download />
          </a>
        </Button>
      </td>
    </tr>
  );
};
