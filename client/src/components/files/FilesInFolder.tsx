import { FileUpload } from './FileUpload';
import { FilesTable } from './FilesTable';
export const FilesInFolder = () => {
  return (
    <div className="p-2 grid gap-2">
      <FileUpload />
      <FilesTable />
    </div>
  );
};
