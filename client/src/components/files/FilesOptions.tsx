import { useState } from 'react';
import { Button } from '../ui/button';
import { FileUpload } from './FileUpload';
import { FilesFolderShare } from './FilesFolderShare';
type ModeOptions = 'closed' | 'share' | 'upload';

export const FilesOptions = () => {
  const [mode, setMode] = useState<ModeOptions>('closed');

  const handleMode = (choice: ModeOptions) => {
    setMode(choice);
  };

  const Option = () => {
    switch (mode) {
      case 'upload':
        return <FileUpload />;
      case 'share':
        return <FilesFolderShare />;
      default:
        return null;
    }
  };

  return (
    <section className="grid gap-2">
      <div className="space-x-2">
        <Button className="w-fit" onClick={() => handleMode('share')}>
          Share
        </Button>
        <Button className="w-fit" onClick={() => handleMode('upload')}>
          New File
        </Button>
        {mode !== 'closed' ? (
          <Button className="w-fit" variant="outline" onClick={() => handleMode('closed')}>
            Close
          </Button>
        ) : null}
      </div>
      <Option />
    </section>
  );
};
