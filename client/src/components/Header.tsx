import { PropsWithChildren } from 'react';
import { Cloud } from 'lucide-react';
export const Header = ({ children }: PropsWithChildren) => {
  return (
    <header className="flex items-center h-[50px] border-b-2 px-2 shadow-sm bg-primary-foreground">
      <Cloud />
      <div className="ml-auto flex gap-2 items-center">{children}</div>
    </header>
  );
};
