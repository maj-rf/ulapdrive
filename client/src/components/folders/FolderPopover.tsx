import { Popover } from '@/components/ui/popover';
import { PropsWithChildren } from 'react';

export function FolderPopover(props: PropsWithChildren) {
  return <Popover>{props.children}</Popover>;
}
