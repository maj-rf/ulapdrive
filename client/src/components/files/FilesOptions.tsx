import { PropsWithChildren, useState } from 'react';
import { Button } from '../ui/button';
import { FileUpload } from './FileUpload';
import { FilesFolderShare } from './FilesFolderShare';
type ModeOptions = 'closed' | 'share' | 'upload';

export const FilesOptions = () => {
  const [mode, setMode] = useState<ModeOptions>('closed');

  const handleMode = (choice: ModeOptions) => {
    setMode(choice);
  };

  const Option = (props: PropsWithChildren) => {
    switch (mode) {
      case 'upload':
        return <FileUpload>{props.children}</FileUpload>;
      case 'share':
        return <FilesFolderShare>{props.children}</FilesFolderShare>;
      default:
        return null;
    }
  };

  return (
    <section className="grid gap-2 place-items-center">
      <div className="space-x-2">
        <Button className="w-fit" onClick={() => handleMode('share')}>
          Share
        </Button>
        <Button className="w-fit" onClick={() => handleMode('upload')}>
          New File
        </Button>
      </div>
      <Option>
        {mode && (
          <Button type="button" variant="outline" onClick={() => handleMode('closed')}>
            Close
          </Button>
        )}
      </Option>
    </section>
  );
};
