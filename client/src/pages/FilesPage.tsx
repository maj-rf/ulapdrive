import { FilesOptions } from '@/components/files/FilesOptions';
import { FilesTable } from '@/components/files/FilesTable';
import { useParams } from 'react-router';
export const FilesPage = () => {
  const { folderId } = useParams();
  return (
    <div className="p-2 grid gap-2">
      <FilesOptions key={folderId} />
      <FilesTable />
    </div>
  );
};
