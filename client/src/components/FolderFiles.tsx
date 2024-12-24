import { getFilesFromFolder } from '@/services/fileService';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { Loading } from './Loading';

export const FolderFiles = () => {
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
      <div>Please upload some file.</div>
    ) : (
      data.map((file) => <div key={file.id}>{file.name}</div>)
    );
  return (
    <div>
      <h1>Files</h1>
      {dataDiv}
    </div>
  );
};
