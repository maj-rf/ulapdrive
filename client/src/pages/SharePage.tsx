import { Loading } from '@/components/Loading';
import { getPublicSharedFolder } from '@/services/shareService';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import sadCloud from '../assets/sad-cloud.svg';
import { calculateExpiration, timeSince, calculateFileSize } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { IconType } from '@/components/files/IconType';
import { ModeToggle } from '@/components/ModeToggle';

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

  if (isPending)
    return (
      <div className="w-full sm:w-[800px] mx-auto ">
        <Loading />
      </div>
    );
  if (error) return <div>{error.message}</div>;
  return (
    <div className="w-full sm:w-[800px] mx-auto ">
      <div className="px-4 py-2">
        <div className="flex gap-2 items-center">
          <h1>{data.folder.name}</h1>
          <ModeToggle />
        </div>

        <p>This link will expire in {calculateExpiration(data.expiresAt)}</p>
      </div>

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
        <section className="relative overflow-x-auto shadow-md dark:shadow-primary-foreground sm:rounded-lg p-2">
          <table className="divide-y w-full">
            <thead className="">
              <tr className="font-medium uppercase text-xs text-start">
                <th className="px-4 py-2">Filename</th>
                <th className="px-4 py-2">Size</th>
                <th className="px-4 py-2">Uploaded</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.folder.files.map((file) => (
                <tr className="space-y-1" key={file.id}>
                  <td headers="Filename">
                    <div className="flex gap-1">
                      <span>
                        <IconType fileType={file.mimeType} />
                      </span>
                      <p className="flex-1 sm:truncate sm:w-20">{file.name}</p>
                    </div>
                  </td>
                  <td headers="Filesize" className="flex gap-1">
                    <p>{calculateFileSize(file.size)}</p>
                  </td>
                  <td headers="Uploaded"> {timeSince(new Date(file.createdAt))} ago</td>
                  <td className="flex gap-2" headers="Actions">
                    {' '}
                    <Button asChild variant="secondary" name="download-button">
                      <a href={file.url} download>
                        <span className="sm:hidden lg:block">Download</span>
                        <Download />
                      </a>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};
