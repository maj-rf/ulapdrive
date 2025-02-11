import { useDeleteFile } from '@/hooks/useFile';
import type { File } from '@/types/types';
import { Button } from '../ui/button';
import { calculateFileSize, cn, timeSince } from '@/lib/utils';
import { Loading } from '../Loading';
import { Download, Trash2, Image, ImagePlay, FileText, FileIcon, Package } from 'lucide-react';

// const FileTypes = 'jpeg' | 'jpg' | 'png' | 'webp' |'gif' | '.doc' |

// const fileTypes = [
// 'application/msword',
// 'application/pdf',

// 'application/zip']

const IconType = ({ fileType }: { fileType: string }) => {
  if (['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(fileType)) {
    return <Image />;
  } else if (fileType === 'image/gif') {
    return <ImagePlay />;
  } else if (fileType === 'text/plain') {
    return <FileText />;
  } else if (fileType === 'application/pdf' || fileType === 'application/msword') {
    return <FileIcon />;
  } else if (fileType === 'application/zip') {
    return <Package />;
  }
  return null;
};

export const FileSingle = (props: File) => {
  const remove = useDeleteFile(props.folderId);

  const handleDelete = () => {
    remove.mutate({ folderId: props.folderId, id: props.id });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2 items-center">
      <div>
        <p className="underline truncate">{props.name}</p>
        <div className="flex gap-2 items-center">
          <div>
            <IconType fileType={props.mimeType} />
          </div>
          <p>{calculateFileSize(props.size)}</p>
        </div>
        <p className="text-muted-foreground">Uploaded {timeSince(new Date(props.createdAt))} ago</p>
      </div>
      <div className="flex gap-2">
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
      </div>
    </div>
  );
};
