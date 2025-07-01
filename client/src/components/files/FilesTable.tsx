import { useParams } from 'react-router';
import { Loading } from '../Loading';
import sadCloud from '../../assets/sad-cloud.svg';
import { useFiles } from '@/hooks/useFile';
import { FileSingle } from './FileSingle';

export const FilesTable = () => {
  const { folderId } = useParams();
  const { data, isPending, error } = useFiles(folderId as string);

  if (isPending)
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {data.length === 0 ? (
        <div className="flex flex-col w-full items-center justify-center">
          <img
            src={sadCloud}
            alt="sad-cloud"
            className="w-auto h-40 dark:filter dark:invert animate-wiggle"
          />
          <p className="font-bold">Please upload some files to make this ulap happy!</p>
        </div>
      ) : (
        <section className="relative overflow-x-auto shadow-md dark:shadow-primary-foreground sm:rounded-lg p-2">
          <table className="min-w-full divide-y">
            <thead className="">
              <tr className="font-medium uppercase text-xs text-start">
                <th className="px-4 py-2">Filename</th>
                <th className="px-4 py-2">Size</th>
                <th className="px-4 py-2">Uploaded</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.map((file) => (
                <FileSingle key={file.id} {...file} />
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
};
