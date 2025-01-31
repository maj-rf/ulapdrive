import { FileUpload } from '@/components/files/FileUpload';
import { FilesFolderShare } from '@/components/files/FilesFolderShare';
import { FilesTable } from '@/components/files/FilesTable';
export const FilesPage = () => {
  return (
    <div className="p-2 grid gap-2">
      <FileUpload />
      <FilesFolderShare />
      <FilesTable />
    </div>
  );
};
