import { Loading } from '@/components/Loading';
import { getPublicSharedFolder } from '@/services/shareService';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import sadCloud from '../assets/sad-cloud.svg';

export const SharePage = () => {
  const { linkId } = useParams();
  const { data, isPending, error } = useQuery({
    queryKey: ['shared', { linkId: linkId as string }],
    queryFn: () => getPublicSharedFolder(linkId as string),
    throwOnError: true,
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: 1,
  });

  if (isPending) return <Loading />;
  if (error) return <div>{error.message}</div>;
  return (
    <div>
      <h1>{data.folder.name}</h1>
      {data.folder.files.length === 0 ? (
        <div className="flex flex-col w-full items-center justify-center">
          <img
            src={sadCloud}
            alt="sad-cloud"
            className="w-auto h-40 dark:filter dark:invert animate-wiggle"
          />
          <p className="font-bold">No files have been uploaded in this folder!</p>
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md dark:shadow-primary-foreground sm:rounded-lg p-2">
          <table className="min-w-full divide-y">
            <thead className="">
              <tr className="font-medium uppercase text-xs text-start">
                <th className="px-4 py-2">Filename</th>
                <th className="px-4 py-2">Filetype</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.folder.files.map((file) => (
                <tr className="space-y-1">
                  <td className="truncate text-left">{file.name}</td>
                  <td className="truncate">{file.mimeType.split('/')[1]}</td>
                  <td>{new Date(file.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
