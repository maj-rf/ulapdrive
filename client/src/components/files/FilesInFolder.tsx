import { getFilesFromFolder } from '@/services/fileService';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { Loading } from '../Loading';
import { FileUpload } from './FileUpload';
import sadCloud from '../../assets/sad-cloud.svg';
export const FilesInFolder = () => {
  const { folderId } = useParams();
  const { data, isPending, error } = useQuery({
    queryKey: ['files', { folderId }],
    queryFn: () => getFilesFromFolder(folderId as string),
    throwOnError: true,
  });

  if (isPending) return <Loading />;
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
      data.map((file) => <div key={file.id}>{file.name}</div>)
    );
  return (
    <div className="p-2 grid gap-2">
      <h1>Files</h1>
      <FileUpload />
      {dataDiv}
    </div>
  );
};
