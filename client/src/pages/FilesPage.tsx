import { FileUpload } from '@/components/files/FileUpload';
import { FilesTable } from '@/components/files/FilesTable';
export const FilesPage = () => {
  return (
    <div className="p-2 grid gap-2">
      <FileUpload />
      <FilesTable />
    </div>
  );
};
