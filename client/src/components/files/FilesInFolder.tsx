import { useParams } from 'react-router';
import { Loading } from '../Loading';
import { FileUpload } from './FileUpload';
import sadCloud from '../../assets/sad-cloud.svg';
import { useFiles } from '@/hooks/useFile';
import { FileSingle } from './FileSingle';
export const FilesInFolder = () => {
  const { folderId } = useParams();
  const { data, isPending, error } = useFiles(folderId as string);

  if (isPending)
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  if (error) return <div>{error.message}</div>;
  const dataDiv =
    data.length === 0 ? (
      <div className="flex flex-col w-full items-center justify-center max-h-max">
        <img
          src={sadCloud}
          alt="sad-cloud"
          className="w-auto h-40 dark:filter dark:invert animate-wiggle"
        />
        <p className="font-bold">Please upload some files to make this ulap happy!</p>
      </div>
    ) : (
      data.map((file) => <FileSingle key={file.id} {...file} />)
    );
  return (
    <div className="p-2 grid gap-2">
      <FileUpload />
      {dataDiv}
    </div>
  );
};
